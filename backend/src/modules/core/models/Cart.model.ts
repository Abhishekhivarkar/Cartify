import mongoose from "mongoose"
import {Document,Model} from "mongoose"
import {IItems,ICart} from "../cart.types.js"

const itemsSchema= new mongoose.Schema<IItems>{(
        variant:{
            type:mongoose.Types.ObjectId,
            ref:"productVariants"
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        }
    )}

const cartSchema = new mongoose.Schema<ICart>({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    items:[itemsSchema]
},{timestamps:true})

const CartModel:Model<ICart> = mongoose.model<ICart>("Cart",cartSchema)

export default CartModel