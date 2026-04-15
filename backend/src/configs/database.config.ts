import {config} from "./env.config.js"
import mongoose from "mongoose"

export const connectDB = async ():Promise<void> =>{
 try{
  await mongoose.connect(config.MONGO_URI as string)
  
  console.log("database connected successfully")
 }catch(err){
  console.log("Failed to connect with database")
  process.exit(1)
 }
}