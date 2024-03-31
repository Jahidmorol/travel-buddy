import express from "express";
import { userController } from "./User.controller";
import validationRequest from "../../middlewares/ValidationRequest";
import { userValidation } from "./User.validation";

const router = express.Router();

router.post(
  "/register",
  validationRequest(userValidation.createUserValidation),
  userController.createUser
);

export const userRoute = router;
