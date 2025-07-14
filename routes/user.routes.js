import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/user.controllers.js";
const userRouter = express.Router();

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.post("/login", loginUser)

export default userRouter;
