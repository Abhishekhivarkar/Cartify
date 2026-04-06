import {config} from "./env.config.js"
import mongoose from "mongoose"
export const connectDB = async () =>{
 try{
  await mongoose.connect(config.MONGO_URI)
  
  console.log("database connected successfully")
 }catch(err){
  console.log("Failed to connect with database")
  process.exit(1)
 }
}