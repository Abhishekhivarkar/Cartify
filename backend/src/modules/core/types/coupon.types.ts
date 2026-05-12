import type {Document} from "mongoose"

export interface ICoupon extends Document{
 code:string,
 discountType:string,
 discountValue:number,
 minOrderAmount:number,
 expiryDate:Date,
 isActive:boolean
}
