import mongoose from "mongoose"
import slugify from "slugify"

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category name is required"],
        unique:true
    },

    slug:{
        type:String,
        unique:true
    },

    attributes:[{
        name:{
            type:String
        },
        values:[String]
    }]

},{timestamps:true})


categorySchema.pre("save",function(next){

    if(this.isModified("name")){
        this.slug = slugify(this.name,{lower:true})
    }

    next()
})

export default mongoose.model("Category",categorySchema)