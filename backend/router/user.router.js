import express from "express";
import { SingUp, addUser, deleteUser, getAllUsers, getsingleUser, login, updateUser } from "../controller/user.controller";

const router = express.Router()

router.get("/getalluser",getAllUsers);

router.post("/adduser",addUser)

router.post("/signup",SingUp)

router.post("/login",login);

router.get("/singleuser/:user_id",getsingleUser);

router.put("/updateuser/:user_id",updateUser);

router.delete("/deleteuser/:user_id",deleteUser);





export default router;