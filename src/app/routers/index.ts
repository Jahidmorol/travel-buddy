import express from "express";
import { userRoute } from "../modules/User/User.routes";
import { authRouter } from "../modules/Auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoute,
  },

  {
    path: "/",
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
