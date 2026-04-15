import mongoose,{Model,Document} from "mongoose"
import {Countries,Country} from "../../../enums/country.enum.js"
import {ROLE,ROLES} from "../../../configs/role.config.js"
import bcryptjs from "bcryptjs"



export interface IAddress{
    country:string,
    state:string,
    city:string,
    postalCode:number,
    landMark:string,
    address:string
}


export interface IUser extends Document{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phoneNumber:string,
    address:IAddress[],
    role:string,
    passwordResetOTP?:string,
    passwordResetOTPExpires?:Date,
    comparePassword(enteredPassword:string): Promise<boolean>
}


const addressSchema =new mongoose.Schema<IAddress>({
 country:{
  type:String,
  required:[true,"Country is required"],
  enum:Countries,
  default:Country.India
 },
 state:{
  type:String,
  required:[true,"State is required"],
  trim:true
 },
 city:{
  type:String,
  required:[true,"City is required"],
  trim:true
 },
 postalCode:{
  type:Number,
  required:[true,"Postel code is required"]
 },
 landMark:{
  type:String,
  required:[true,"Land mark is required"],
  trim:true
 },
 address:{
  type:String,
  required:[true,"Address is required"],
  minlength:[10,"Address must be 10 characters long"],
  maxlength:[100,"Address must be less than 100 characters."]
 }
})

const userSchema =new mongoose.Schema<IUser>({
 firstName:{
  required:[true,"First name is required"],
  type:String,
  trim:true
 },
 lastName:{
  required:[true,"Last name is required"],
  type:String,
  trim:true
 },
 email:{
  required:[true,"Email is required"],
  type:String,
  trim:true,
  lowercase:true,
  unique:[true,"Email is already in use"]
 },
 password:{
  required:[true,"Password is required"],
  trim:true,
  type:String,
  select:false
 },
 phoneNumber:{
  type:String,
  minlength:[10,"Invalid phone number"],
  maxlength:[15,"Invalid phone number"],
  trim:true,
  required:[true,"Phone number is required"]
 },
 address:[addressSchema],
 role:{
  type:String,
  required:[true,"Role is required"],
  enum:ROLES,
  default:ROLE.USER
 },
 passwordResetOTP:String,
 passwordResetOTPExpires:Date
},{timestamps:true})

userSchema.pre<IUser>("save",async function(){
 if(!this.isModified("password")){
  return
 }
 
 const hash = await bcryptjs.hash(this.password,10)
 
 this.password = hash
 return 
})

userSchema.methods.comparePassword =async function(enteredPassword:string):Promise<boolean>{
 return await bcryptjs.compare(enteredPassword,this.password)
}

const User:Model<IUser> =mongoose.model<IUser>("User",userSchema) 

export default User