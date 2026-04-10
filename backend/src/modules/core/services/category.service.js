import { AppError } from "../../../utils/appError.util.js"
import { createCategory, findCategoryById, findCategoryByIdAndDelete, getAllCategory, updateCategoryById} from "../repositories/category.repository.js"
import slugify from "slugify"
export const createCategoryService = async ({name,attributes}) =>{

  
    const newCategory = await createCategory({name,attributes})

    
    return newCategory
}

export const allCategoryService = async ()=>{
    const category = await getAllCategory()

    return category
}

export const updateCategoryService = async ({categoryId,updatedData}) =>{

     if(updatedData.name){
        updatedData.slug = slugify(updatedData.name,{lower:true})
    }
    const category = await updateCategoryById({categoryId,updatedData})

    if(!category){
        throw new AppError("Category not found",404)
    }

    return category
}


export const getCategoryByIdService = async (categoryId) =>{
    const category = await findCategoryById(categoryId)

    if (!category){
        throw new AppError("Category not found")
    }

    return category
}

export const deleteCategoryservice = async (categoryId) =>{
    const category = await findCategoryByIdAndDelete(categoryId)

    if (!category){
        throw new AppError("Category not found")
    }

    return category
}