import dotenv from "dotenv"
import { cleanEnv, str, port, url } from "envalid"

dotenv.config()

export const config = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: url(),
  JWT_SECRET: str(),
  REFRESH_TOKEN_SECRET: str()
})