import type {Document} from "mongoose"

export interface IItems{
 variant:string,
 quantity:number
}

export interface ICart extends Document{
 user:mongoose.Types.ObjectId,
 items:IItems[],
}

