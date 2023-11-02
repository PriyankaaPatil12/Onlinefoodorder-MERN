import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
 
  size: [{ type: String, required: true }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


export default mongoose.model("pizza", pizzaSchema);
