import mongoose from "mongoose";
import pizzaModel from "./pizza.model";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
 
  pizzaID: {
    type: Schema.Types.ObjectId,
    requred: true,
    ref:pizzaModel,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Cart", CartSchema);