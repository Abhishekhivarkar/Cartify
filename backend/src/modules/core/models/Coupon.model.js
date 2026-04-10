import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:[true,"Coupon code is required"],
        unique:[true,"Coupon already in use"]
    },
    discountType:{
        type:String,
        enum:["PERCENTAGE","FIXED"],
        default:"PERCENTAGE"
    },
    discountValue:Number,
    minOrderAmount:Number,
    expiryDate:Date,
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

export default mongoose.model("Coupon",couponSchema)