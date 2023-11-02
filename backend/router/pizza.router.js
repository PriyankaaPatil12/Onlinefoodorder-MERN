import express from "express";
import { addPizza, deletepizza, getAllpizza, getsinglepizza, updatePizza } from "../controller/pizza.controller";



const router = express.Router();

router.get("/getallpizza",getAllpizza);

router.post("/addpizza",addPizza);

router.get("/singlepizza/:pizza_id",getsinglepizza)

router.put("/updatepizza/:pizza_id",updatePizza);

router.delete("/deletepizza/:pizza_id",deletepizza);


export default router;
