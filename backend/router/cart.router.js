import express from "express";
import { addToCart, getAllCartItem, removeFromCart, updateQuantity } from "../controller/cart.controller";



const router = express.Router();

router.get("/getallcart",getAllCartItem);

router.get("/addcart/:pizza_ID",addToCart);

router.put("/updatecart/:cart_id",updateQuantity);

router.delete("/deletecart/:cart_id",removeFromCart);


export default router;
