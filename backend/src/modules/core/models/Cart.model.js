import mongoose, { Types } from "mongoose"

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    items:[{
        variant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"productVariants"
        },
        quantity:{
            type:Number
        }
    }]
},{timestamps:true})

export default mongoose.model("Cart",cartSchema)