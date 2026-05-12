import mongoose from "mongoose"
import {ICoupon} from "../types/coupon.types.js"


const couponSchema = new mongoose.Schema<ICoupon> ({
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


const CouponModel:Model<ICoupon> = mongoose.model<ICoupon>("Coupon",couponSchema)

export default CouponModel