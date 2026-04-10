import mongoose from "mongoose"
import slugify from "slugify"
const variantSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:[true,"Product is required"]
    },
    sku:{
        type:String,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    attributes:{
        type:Map,
        of:String
    },
    image:[String]
},{timestamps:true})

variantSchema.pre("save",function(next){
    if(!this.sku){
        const attrValues = [...this.attributes.values()].join("-")
        this.sku = slugify(attrValues,{upper:true})
    }
    next()
})

export default mongoose.model("productVariant",variantSchema)