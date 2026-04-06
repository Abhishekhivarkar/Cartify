import {findUserByEmail,findAdminByEmail,createUser,findUserForLogin,findSessionById,createAdmin,findAdminForLogin,findUserById, findAdminById} from "../repositories/auth.repository.js"
import {config} from "../../../configs/env.config.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { AppError } from "../../../utils/appError.util.js"



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