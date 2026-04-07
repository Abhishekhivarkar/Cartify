import axios from "axios"
import { config } from "../configs/env.config.js"


const brevoClient = axios.create({
    baseURL: "https://api.brevo.com/v3",
    headers:{
        "api-key": config.BREVO_API_KEY,
        "Content-Type": "application/json"
    }
})

export const sendForgotPasswordOTP = async ({ email, otp }) => {
  await brevoClient.post("/smtp/email", {
    sender: {
      email: config.BREVO_SENDER_EMAIL,
      name: config.BREVO_SENDER_NAME
    },
    to: [
      {
        email: email
      }
    ],
    subject: "Reset Your Password - OTP Code",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
        <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:8px; text-align:center;">
          
          <h2 style="color:#333;">Password Reset Request</h2>

          <p style="color:#555; font-size:16px;">
            We received a request to reset your password.
          </p>

          <p style="color:#555; font-size:16px;">
            Use the OTP below to reset your password:
          </p>

          <div style="font-size:28px; font-weight:bold; letter-spacing:6px; margin:20px 0; color:#2c7be5;">
            ${otp}
          </div>

          <p style="color:#777; font-size:14px;">
            This OTP will expire in 10 minutes.
          </p>

          <p style="color:#777; font-size:14px;">
            If you did not request this, please ignore this email.
          </p>

          <hr style="margin:25px 0;">

          <p style="font-size:12px; color:#999;">
            © ${new Date().getFullYear()} ${config.BREVO_SENDER_NAME}
          </p>

        </div>
      </div>
    `
  })
}