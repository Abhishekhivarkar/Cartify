import {config} from "../configs/env.config.js"

import AdminModel from "../modules/auth/models/Admin.model.js"
 import {ROLE} from "../configs/role.config.js"
import jwt from "jsonwebtoken"
import UserModel from "../modules/auth/models/User.model.js"
import BlackListTokenModel from "../modules/auth/models/BlackListToken.model.js"
import { AppError } from "../utils/appError.util.js"
 
export const authMiddleware =async (req,res,next) =>{
 try{
  const token = req.headers.authorization?.split(" ")[1]
  
  if(!token){
   return res.status(401).json({
    success:false,
    message:"Token not found"
   })
  }
  const blackListToken = await BlackListTokenModel.findOne({
    token
  })
  if(blackListToken){
    return res.status(403).json({
      success:false,
      message:"Invalid token please login"
    })
  }

  const decoded = jwt.verify(token,config.JWT_SECRET)
  
  let account;
  
  if(decoded.role === ROLE.ADMIN){
   account = await AdminModel.findById(decoded.id)
  }else if(decoded.role === ROLE.USER){
   account = await UserModel.findById(decoded.id)
  }
  
  if(!account){
   return res.status(401).json({
    success:false,
    message:"Invalid token"
   })
  }
  
  req.user = account
  req.userRole = decoded.role
  next()
 }catch(err){
  console.log("AUTH MIDDLEWARE ERROR : ",err)
 return res.status(500).json({
   success:false,
   message:"Auth middleware failed"
  })
 }
}