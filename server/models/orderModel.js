import { Schema, model } from "mongoose";
// A
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      payablePrice: {
        type: Number,
        required: true,
      },
      purchasedQty: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled", "refund"],
  },
  paymentType: {
    type: String,
    enum: ["COD", "VNPAY PAYMENT"],
    default: "COD",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["ordered", "processing", "delivered"],
    default: "ordered",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
