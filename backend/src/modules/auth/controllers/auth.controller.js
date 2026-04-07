import {
  userRegisterService,
  userLoginService,
  refreshTokenService,
  adminRegisterService,
  adminLoginService,
  userGetMeService,
  adminGetMeService,
  logoutService,
  forgotPasswordService,
  confirmOTPService
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { config } from "../../../configs/env.config.js";
import Session from "../models/Session.model.js";
import crypto from "crypto";
import { asyncHandler } from "../../../utils/asyncHandler.util.js";
import { sendForgotPasswordOTP } from "../../../services/mail.service.js";

//user register
export const userRegister = asyncHandler(async (req, res) => {
  const user = await userRegisterService(req.body);

  return res.status(201).json({
    success: true,
    message: "User register successfully",
    user:user._id
  });
});

// admin register
export const adminRegister = asyncHandler(async (req, res) => {
  const user = await adminRegisterService(req.body);

  return res.status(201).json({
    success: true,
    message: "Admin register successfully",
    user:user._id
  });
});

// user login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userLoginService(email, password);

  const session = new Session({
    user: user._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, sessionId: session._id },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  session.refreshTokenHash = refreshTokenHash;
  await session.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const accessToken = jwt.sign(
    { id: user._id, role: user.role, sessionId: session._id },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return res.status(200).json({
    success: true,
    message: "User login successfully",
    accessToken: accessToken,
    user:user._id
  });
});

// admin login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminLoginService(email, password);

  const session = new Session({
    user: admin._id,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const refreshToken = jwt.sign(
    { id: admin._id, role: admin.role, sessionId: session._id },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  session.refreshTokenHash = refreshTokenHash;
  await session.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const accessToken = jwt.sign(
    { id: admin._id, role: admin.role, sessionId: session._id },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return res.status(200).json({
    success: true,
    message: "Admin login successfully",
    accessToken: accessToken,
    user:admin._id
  });
});

// refresh token
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  const token = await refreshTokenService(refreshToken);

  const accessToken = jwt.sign(
    { id: token.userId, role: token.userRole, sessionId: token.session._id },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const newRefreshToken = jwt.sign(
    { id: token.userId, role: token.userRole, sessionId: token.session._id },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  token.session.refreshTokenHash = newRefreshTokenHash;
  await token.session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Access token refreshed successfully!",
    accessToken,
    role: token.userRole,
  });
});

//get me 

export const userGetMe = asyncHandler(async(req,res)=>{
    const user = await userGetMeService(req.user)

    return res.status(200).json({
        success:true,
        user:user
    })
})

export const adminGetMe = asyncHandler(async(req,res)=>{
    const admin = await adminGetMeService(req.user)

    return res.status(200).json({
        success:true,
        user:admin
    })
})

// logout 

export const logout = asyncHandler(async(req,res)=>{
  const refreshToken = req.cookies?.refreshToken
  const accessToken = req.headers.authorization?.split(" ")[1]

  const token = await logoutService({refreshToken,accessToken})

  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    sameSite:"strict"
  })

  return res.status(200).json({
    success:true,
    message:"Logout successfully!"
  })
}) 


export const forgetPassword = asyncHandler(async(req,res)=>{
  const {email} = req.body
  const {user,otp} = await forgotPasswordService({email})
  
  await sendForgotPasswordOTP({
    email:user.email,
    otp
  })

  return res.status(200).json({
    sucess:true,
    message:"OTP sent successfully"
  })
})


export const confirmOTP = asyncHandler(async(req,res)=>{
  const {otp} = req.body

  const check = await confirmOTPService({otp})

  return res.status(200).json({
    success:true,
    message:"OTP confirmed successfully"
  })
})