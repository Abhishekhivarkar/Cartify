import mongoose from "mongoose"
import slugify from "slugify"
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"]
    },
    slug:{
        type:String,
        unique:[true,"This slug is already in use"]
    },
    description:{
        type:String,
        trim:true,
        minlength:[10,"Description length must be less than 10 characters"],
        maxlength:[500,"Description length must be 500 characters long"]
    },
    brand:{
        type:String,
        trim:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:[true,"Category is required"]
    },
    image:{
        type:String
    },
    attributes:{
        type:Map,
        of:String
    },
    ratingsAverage:{
        type:Number,
        default:0,
    },
    ratingsCount:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

productSchema.pre("save",function(next){
    if(this.isModified("name")){
        this.slug = slugify(this.name,{lower:true})
    }
    next()
})

export default mongoose.model("Product",productSchema)