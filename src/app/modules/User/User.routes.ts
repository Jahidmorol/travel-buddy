import express from "express";
import { userController } from "./User.controller";

const router = express.Router();

router.post("/register", userController.createUser);

export const userRoute = router;
