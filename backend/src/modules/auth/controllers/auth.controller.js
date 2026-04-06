import {userRegisterService,userLoginService,refreshTokenService,adminRegisterService} from "../services/auth.service.js"
import jwt from "jsonwebtoken"
import {config} from "../../../configs/env.config.js"
import Session from "../models/Session.model.js"
import crypto from "crypto"

export const userRegister = async (req,res) =>{
 try{
  const user = await userRegisterService(req.body)
  
  return res.status(201).json({
   success:true,
   message:"User register successfully"
  })
 }catch(err){
  console.log("USER REGISTER API ERROR : ",err)
  res.status(err.statusCode || 500).json({
   success:false,
   message:err.message || "Failed to register user"
  })
 }
}


export const adminRegister = async (req,res) =>{
 try{
  const user = await adminRegisterService(req.body)
  
  return res.status(201).json({
   success:true,
   message:"Admin register successfully"
  })
 }catch(err){
  console.log("ADMIN REGISTER API ERROR : ",err)
  res.status(err.statusCode || 500).json({
   success:false,
   message:err.message || "Failed to register admin"
  })
 }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userLoginService(email, password)


        const session = new Session({
            user: user._id,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const refreshToken = jwt.sign(
            { id: user._id, role: user.role, sessionId: session._id },
            config.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        session.refreshTokenHash = refreshTokenHash
        await session.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const accessToken = jwt.sign(
            { id: user._id, role: user.role, sessionId: session._id },
            config.JWT_SECRET,
            { expiresIn: "15m" }
        )

        return res.status(200).json({
            success: true,
            message: "User login successfully",
            accessToken: accessToken
        })
    } catch (err) {
        console.log("LOGIN API ERROR : ", err)
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Failed to login"
        })
    }
}

export const refreshToken = async (req,res) =>{
 try{
  const refreshToken = req.cookies?.refreshToken
  
  const token =await refreshTokenService(refreshToken)
  
  const accessToken = jwt.sign(
   {id:token.userId,role:token.userRole,sessionId:token.session._id},
   config.JWT_SECRET,
   {expiresIn:"15m"}
  )
  
  const newRefreshToken = jwt.sign(
   {id:token.userId,role:token.userRole,sessionId:token.session._id},
   config.REFRESH_TOKEN_SECRET,
   {expiresIn:"7d"}
  )
  
  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")
  
  token.session.refreshTokenHash = newRefreshTokenHash
  await token.session.save()
  
  res.cookie("refreshToken",newRefreshToken,{
   httpOnly:true,
   secure:false,
   sameSite:"strict",
   maxAge:7 * 24 * 60 * 60 * 1000
  })
  
   return res.status(200).json({
    success:true,
    message:"Access token refreshed successfully!",
    accessToken,
    role:token.userRole
   })
 }catch(err){
  console.log("REFRESH TOKEN API ERROR : ",err)
  res.status(err.statusCode || 500).json({
   success:false,
   message:err.message || "Refresh token api failed"
  })
 }
}


