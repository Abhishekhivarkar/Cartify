import mongoose from "mongoose"
import slugify from "slugify"
import {Model} from "mongoose"
import {IAttributes,ICategory} from "../types/category.types.js"


const categorySchema = new mongoose.Schema<ICategory>({
    name:{
        type:String,
        required:[true,"Category name is required"],
        unique:true,
        trim:true
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


categorySchema.pre<ICategory> ("save",function(){
    if(this.isModified("name")){
        this.slug = slugify(this.name,{lower:true})
    }
})

const CategoryModel:Model<ICategory> = mongoose.model<ICategory>("Category",categorySchema)

export default CategoryModel
