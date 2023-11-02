import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userrouter from "./router/user.router"
import pizzarouter from "./router/pizza.router";
import cartrouter from "./router/cart.router"
import cors from "cors";
const stripe = require('stripe')('sk_test_51NlxoSSEauZqEu7zDRaVsDyvEc9LXBDn50KEWO0r972905rH1I2Z4IHd3qRQmMSfMrABZKoyJnpwYQyD7JrTpNTX00pzRQoVDW');

var app = express();

const PORT = process.env.PORT || 8004;

app.use(express.json());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.static(__dirname));
app.listen(PORT, () => {
  console.log("Your server running on http://localhost:" + PORT);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.DB_NAME)
  .then(() => console.log("Connected!"));


  //checkout api

app.post("/api/create-checkout-session",async(req,res)=>{
  const {product} = req.body;
  console.log(product)

  const lineitems = product.map((product)=>({
    price_data:{
      currency:"inr",
      product_data:{
        name:product.name
      },
      unit_amount:product.price *100,
    },
    quantity:product.quantity
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineitems,
    mode:"payment",
    success_url:"http://localhost:3000/success",
    cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})
})



app.use("/user",userrouter)
app.use("/pizza",pizzarouter)
app.use("/cart",cartrouter)