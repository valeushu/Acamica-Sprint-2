import mon from "mongoose";
const { Schema, model } = mon;

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
