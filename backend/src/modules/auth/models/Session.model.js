import mongoose from "mongoose"

const sessionSchema =new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:[true,"User is required"]
 },
 refreshTokenHash:{
  required:[true,"Refresh token hash is required"],
  type:String
 },
 ip:{
  required:[true,"IP is required"],
  type:String
 },
 userAgent:{
  type:String,
  required:[true,"User agent is required"]
 },
 isRevoked:{
  type:Boolean,
  default:false
 }
},{timestamps:true})

export default mongoose.model("Session",sessionSchema)