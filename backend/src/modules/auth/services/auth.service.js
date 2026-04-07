import {findUserByEmail,findAdminByEmail,createUser,findUserForLogin,findSessionById,createAdmin,findAdminForLogin,findUserById, findAdminById, createBlackListToken,findSessionBySessionId, findUserAndAdminByEmail, findUserByhashOTP} from "../repositories/auth.repository.js"
import {config} from "../../../configs/env.config.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { AppError } from "../../../utils/appError.util.js"
import { generateOTP } from "../../../utils/generateOTP.util.js"



export const userRegisterService = async (data)=>{
  
  const existingUser = await findUserByEmail(data.email)
  
  if(existingUser){
   throw new AppError("This email already in use",409)
  }
  
  const newUser = await createUser(data)
  
  return newUser
}



export const adminRegisterService = async (data)=>{
  
  const existingUser = await findAdminByEmail(data.email)
  
  if(existingUser){
   throw new AppError("This email already in use",409)
  }
  
  const newUser = await createAdmin(data)
  
  return newUser
}



export const userLoginService = async (email,password) =>{

  const user = await findUserForLogin({email})
  
  if(!user){
   throw new AppError("Email is not registered",404)
  }
  
  const compare = await user.comparePassword(password)
  
  if(!compare){
   throw new AppError("Incorrect password",403)
  }
  
  return user
}



export const adminLoginService = async (email,password) =>{

  const admin = await findAdminForLogin({email})
  
  if(!admin){
   throw new AppError("Email is not registered",404)
  }
  
  const compare = await admin.comparePassword(password)
  
  if(!compare){
   throw new AppError("Incorrect password",403)
  }
  
  return admin
}



export const refreshTokenService = async (refreshToken) =>{

  if(!refreshToken){
   throw new AppError("refresh token not found",404)
  }
  
  const decoded = jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
 
  const session = await findSessionById({refreshTokenHash:refreshTokenHash})
  
  if(!session){
   throw new AppError("Session not found",404)
  }
 
  return{
   userId:decoded.id,
   userRole:decoded.role,
   session
  }
}

export const userGetMeService = async (userId) =>{
    if(!userId){
        throw new AppError("Invalid user id",403)
    }

    const user = await findUserById(userId)

    if(!user){
        throw new AppError("User not found",404)
    }

    return user
}

export const adminGetMeService = async (userId) =>{
    if(!userId){
        throw new AppError("Invalid user id",403)
    }

    const user = await findAdminById(userId)

    if(!user){
        throw new AppError("User not found",404)
    }

    return user
}

export const logoutService = async({refreshToken,accessToken}) =>{
  if(!refreshToken){
    throw new AppError("Refresh token not found",404)
  }

  if(!accessToken){
    throw new AppError("Access token not found",404)
  }

  const decoded = jwt.verify(accessToken,config.JWT_SECRET)
  const session = await findSessionBySessionId(decoded.sessionId)

  if(!session){
    throw new AppError("Session not found",404)
  }

  session.isRevoked = true
  await session.save()

  const blackListToken = await createBlackListToken({accessToken})
  return true
}

export const forgotPasswordService = async ({email}) =>{
  const user = await findUserAndAdminByEmail({email})

  if(!user){
    throw new AppError("User not found",404)
  }

  let otp = generateOTP()

  const hashOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex")

  user.passwordResetOTP = hashOTP
  user.passwordResetOTPExpires = Date.now() + 10 * 60 * 1000

  await user.save()
  return {
    user,otp
  }
}


export const confirmOTPService = async({otp}) =>{
  const hashOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex")

  const user = await findUserByhashOTP({hashOTP})

  if(!user){
    throw new AppError("Incorrect or expired OTP",403)
  }
  user.passwordResetOTP = undefined
  user.passwordResetOTPExpires = undefined

  await user.save()
  return true
}