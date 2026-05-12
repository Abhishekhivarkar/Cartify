import type {Response,Request,NextFunction,RequestHandler} from "express"


type AsyncHandler =(
 req:Request,
 res:Response,
 next:nextFunction
) => Promise<any>

export const asyncHandler = (fn:AsyncHandler):RequestHandler =>{
 return(req,res,next) =>{
  Promise.resolve(fn(req,res,next)).catch(next)
 }
}

