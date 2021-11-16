import PaymentMethod from "../models/payMeth.js";

export const createPayMeth = async (req, res) => {
  const { payment, deleted } = req.body;
  const newPayMeth = new PaymentMethod({ payment, deleted });
  const payMethSaved = await newPayMeth.save();

  res.status(201).json({
    payMethSaved,
  });
};

export const getPayMeth = async (req, res) => {
  const payMethods = await PaymentMethod.find();
  res.json({ 'Payment Methods' : payMethods });
};

export const updatePayMethById = async (req, res) => {
  const updatePayMeth = await PaymentMethod.findByIdAndUpdate(
    req.params.paymentId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ "update payment method": updatePayMeth });
};

export const deletePaymentById = async (req, res) => {
  await PaymentMethod.findByIdAndDelete(req.params.paymentId);
  res.send("Payment method deleted");
};