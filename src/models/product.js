import mon from "mongoose";
const { Schema, model } = mon;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    imgUrl: String,
    stock: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
