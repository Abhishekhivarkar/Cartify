import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User is required"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Product is required"]
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    message:{
        type:String,
        minlength:[10,"Message must be 10 characters long"],
        maxlength:[500,"Message must be less than 500 characters"]
    }
},{timestamps:true})

export default mongoose.model("Review",reviewSchema)