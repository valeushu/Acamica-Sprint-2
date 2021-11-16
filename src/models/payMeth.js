import mon from "mongoose";
const { Schema, model } = mon;


const paySchema = new Schema(
    {
        payment: {
            type: String,
            unique: true,
            require: true
        },
        deleted: {
            type: Boolean,
            default: false 
        }
    })
    export default model("PaymentMethod", paySchema);