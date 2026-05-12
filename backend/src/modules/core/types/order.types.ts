import type {Document} from "mongoose"

export interface IItems{
 variant:mongoose.Types.ObjectId,
 quantity:number,
 price:number
}

export interface IAddress{
 fullName:string,
 phone:string,
 city:string,
 state:string,
 pincode:string,
 addressLine:string
}
export interface IOrder extends Document{
 user:mongoose.Types.ObjectId,
 items:IItems[],
 totalAmount:number,
 paymentStatus:"pending" | "paid" | "failed",
 orderStatus: "pending"| "processing"|"shipped"|"delivered"|"cancelled",
 address:IAddress,
}
