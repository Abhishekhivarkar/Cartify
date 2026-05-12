import type {Document} from "mongoose"
export interface IAttributes{
 name:string,
 values:string[]
}

export interface ICategory extends Document {
 name:string,
 slug:string,
 attributes:IAttributes[]
}

