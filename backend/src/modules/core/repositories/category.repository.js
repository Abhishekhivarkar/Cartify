import CategoryModel from "../models/Category.model.js";

// create category
export const createCategory = async ({name,attributes}) =>{
    return await CategoryModel.create({name,attributes})   
}

// get all categorys
export const getAllCategory = async () =>{
    return await CategoryModel.find()   
}

// update category by id
export const updateCategoryById = async ({categoryId, updatedData}) =>{
    return await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $set: updatedData },   
        { returnDocument: "after", runValidators: true }
    )
}

// get category by id

export const findCategoryById = async (categoryId) =>{
    return await CategoryModel.findById(
        categoryId
    )
}

// delete category 
export const findCategoryByIdAndDelete = async (categoryId) =>{
    return await CategoryModel.findByIdAndDelete(
        categoryId
    )
}