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

router.patch(
  "/update-usr-info/:id",
  auth(UserRole.ADMIN),
  validationRequest(userValidation.userIsActiveValidation),
  userController.updateUserInfo
);

router.patch(
  "/update-user-role/:id",
  auth(UserRole.ADMIN),
  validationRequest(userValidation.userRoleUpdateValidation),
  userController.updateUserInfo
);

router.get(
  "/dashboard-data",
  auth(UserRole.ADMIN),
  userController.getDashboardData
);

export const userRoute = router;
