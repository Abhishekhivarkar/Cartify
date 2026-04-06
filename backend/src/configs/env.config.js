import dotenv from "dotenv"
dotenv.config()
export const config = {
 PORT:process.env.PORT,
 MONGO_URI: process.env.MONGO_URI,
 JWT_SECRET: process.env.JWT_SECRET,
 REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}