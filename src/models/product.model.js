import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    barcode: {
      type: String,
      unique: true,
    },
    price: Number,
    imgURL: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Product", productSchema);
