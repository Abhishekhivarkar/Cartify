import {IOrder,IAddress,IItems} from "../types/order.types.js"

import mongoose from "mongoose"
import type {Model} from "mongoose"
const orderSchema = new mongoose.Schema<IOrder>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      variant: {
        type: mongoose.Types.ObjectId,
        ref: "ProductVariant"
      },

      quantity: Number,

      price: Number
    }
  ],

  totalAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["pending","paid","failed"]
  },

  orderStatus: {
    type: String,
    enum: ["pending","processing","shipped","delivered","cancelled"]
  },

  address: {
    fullName: String,
    phone: String,
    city: String,
    state: String,
    pincode: String,
    addressLine: String
  }

}, { timestamps: true });

const OrderModel:Model<IOrder> = mongoose.model<IOrder>("Order",orderSchema)

export default OrderModel