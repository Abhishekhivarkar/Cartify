import { asyncHandler } from "../../../utils/asyncHandler.util.js"
import { createProductService } from "../services/product.service.js"

export const createProduct = asyncHandler(async(req,res)=>{
    const product = await createProductService(req.body)

    return res.status(201).json({
        success:true,
        message:"Product created successfully"
    })
})