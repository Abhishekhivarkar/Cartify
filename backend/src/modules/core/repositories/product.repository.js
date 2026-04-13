import ProductModel from "../models/Product.model.js"

export const createProduct = async (productData) =>{
    return await ProductModel.create(productData)
}