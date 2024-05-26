import express from "express";
import { userController } from "./User.controller";
import validationRequest from "../../middlewares/ValidationRequest";
import { userValidation } from "./User.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";

const router = express.Router();

router.post(
  "/register",
  validationRequest(userValidation.createUserValidation),
  userController.createUser
);

router.get("/all-user", auth(UserRole.ADMIN), userController.getAllUser);

export const userRoute = router;
