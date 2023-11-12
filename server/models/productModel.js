import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: "",
    },
    proImg: [{ img: { type: String } }],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rating: [
      {
        star: { type: Number },
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// productSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// productSchema.set("toJSON", {
//   virtuals: true,
// });

export default model("Product", productSchema);
