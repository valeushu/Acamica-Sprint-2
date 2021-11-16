import mon from "mongoose";
const { Schema, model } = mon;
import User from "../models/user.js";
import Product from "../models/product.js";

const orderSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    //paymentMethod: String,
    products: [
      {
        idProduct: String,
        name: String,
        price: Number,
        amount: Number
      },
    ],
    total: { type: Number, default: 0 },
    date:{type: Date, default: Date.now}
  
  }
);
orderSchema.pre('save', async function (next) {
  if (this.isModified('products') || this.isNew) {
    const document = this;
    const iduser = document.idUser;
    const products = document.products;
    document.total = 0;
    let user;
    let promises = [];
    try {
      user = await User.findById(iduser);
    } catch (error) {
      next(new Error(`The user with ID ${iduser} does not exist`));
    }
    try {
      if (products.length == 0) {
        next(
          new Error(`No products in the order. Add some products to continue`)
        );
      } else {
        for (const product of products) {
          promises.push(await Product.findById(product.idProduct));
        }
        
        const resultPromises = await Promise.all(promises);
        resultPromises.forEach((product, index) => {
          document.total += product.price * products[index].amount;
          document.products[index].name = product.name;
          document.products[index].price = product.price;
         console.log(product.price)
         console.log(products[index].amount);
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    next();
  }
});
export default model("Order", orderSchema);
