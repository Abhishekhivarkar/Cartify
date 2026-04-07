import dotenv from "dotenv"
import { cleanEnv, str, port, url,email } from "envalid"

dotenv.config()

export const config = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: url(),
  JWT_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  BREVO_API_KEY: str(),
  BREVO_SENDER_EMAIL: email(),
  BREVO_SENDER_NAME: str(),
  CLIENT_URL: url(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  RAZORPAY_KEY_ID: str(),
  RAZORPAY_SECRET: str()
})


