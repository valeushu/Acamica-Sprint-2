import Order from "../models/order.js";
import User from "../models/user.js";

export const getOrders = async (req, res) => {
  const order = await Order.find({}, 'idUser total date products');
  res.json({ orders: order });
};

export const createOrder = async (req, res ) => {
  const { idUser, products } = req.body;

  if (!idUser || !products) {
    res.json( `No information provided to create order`);
  } else if (idUser && products && products.length > 0 ) {
    const order = new Order({ idUser, products });
    try {
      const result = await order.save();
      res.json({"order created": result});
    } catch (error) {
      console.log(error)
    }
  }

};

export const deleteOrderById = async (req, res) => {
  await Order.findByIdAndDelete(req.params.orderId);
  res.send("order deleted");
};  