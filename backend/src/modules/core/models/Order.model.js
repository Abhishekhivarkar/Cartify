const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      variant: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("Order", orderSchema);