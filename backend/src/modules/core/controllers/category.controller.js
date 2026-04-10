import { asyncHandler } from "../../../utils/asyncHandler.util.js";
import { createCategoryService,allCategoryService, updateCategoryService, getCategoryByIdService, deleteCategoryservice} from "../services/category.service.js";

export const createCategory = asyncHandler(async(req,res)=>{
    try{
        const {name,attributes} = req.body

        const category = await createCategoryService({name,attributes})

        return res.status(201).json({
            success:true,
            message:"Category created successfully"
        })

    }catch(error){
        console.log("ERROR:", error.message);
        return res.status(400).json({ error: error.message });
    }
})


export const getAllCategory = asyncHandler(async(req,res)=>{
    const category = await allCategoryService()

    return res.status(200).json({
        success:true,
        data:category
    })
})


export const updateCategory = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params
    const updatedData = req.body
    const category = await updateCategoryService({categoryId,updatedData})

    res.status(201).json({
        success:true,
        message:"Category updated successfully",
        data:category
    })
})

export const getCategoryById = asyncHandler(async(req,res)=>{

    const {categoryId} = req.params

    const category = await getCategoryByIdService(categoryId)

    return res.status(200).json({
        success:true,
        data:category
    })
})

export const deleteCategory = asyncHandler(async(req,res)=>{

    const {categoryId} = req.params

    const category = await deleteCategoryservice(categoryId)

    return res.status(200).json({
        success:true,
        message:"Category deleted successfully"
    })
})