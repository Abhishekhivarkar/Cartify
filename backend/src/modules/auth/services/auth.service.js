import {findUserByEmail,findAdminByEmail,createUser,findUserForLogin,findSessionById,createAdmin} from "../repositories/auth.repository.js"
import {config} from "../../../configs/env.config.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"


export const userRegisterService =async(data)=>{
 try{
  const existingUser =await findUserByEmail(data.email)
  
  if(existingUser){
   const err = new Error("This email already in use")
   err.statusCode = 409
   throw err
  }
  
  const newUser = await createUser(data)
  
  return newUser
 }catch(err){
  throw err
 }
}

export const adminRegisterService =async(data)=>{
 try{
  const existingUser =await findAdminByEmail(data.email)
  
  if(existingUser){
   const err = new Error("This email already in use")
   err.statusCode = 409
   throw err
  }
  
  const newUser = await createAdmin(data)
  
  return newUser
 }catch(err){
  throw err
 }
}

export const userLoginService = async (email,password) =>{
 try{
  const user = await findUserForLogin({email})
  
  if(!user){
   const err = new Error("Email is not registered")
   err.statusCode = 404
   throw err
  }
  
  const compare = await user.comparePassword(password)
  
  if(!compare){
   const err = new Error("Incorrect password")
   err.statusCode = 403
   throw err
  }
  
  return user
 }catch(err){
  throw err
 }
}


export const refreshTokenService = async (refreshToken) =>{
 try{
  if(!refreshToken){
   const err = new Error("refresh token not found")
   err.statusCode = 404
   throw err
  }
  
  const decoded = jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
 
  const session= await findSessionById({refreshTokenHash:refreshTokenHash})
  
  if(!session){
   const err = new Error("Session not found")
   err.statusCode = 404
   throw err
  }
 
  return{
   userId:decoded.id,
   userRole:decoded.role,
   session
  }
 }catch(err){
  throw err
 }
}