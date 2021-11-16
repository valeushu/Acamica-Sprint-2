import mon from "mongoose";
const { Schema, model } = mon;

const productSchema = new Schema(
  {
    name: { type: String, required: true},
    description: String,
    price: {type: Number, required: true },
    imgUrl: String,
    //stock: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
