import { createProduct } from "../repositories/product.repository.js"


export const createProductService = async (productData) =>{
    const product = await createProduct(productData)

    return product
}