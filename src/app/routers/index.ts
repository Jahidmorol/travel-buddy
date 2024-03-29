import express from "express";
import { userRoute } from "../modules/User/User.routes";
import { authRouter } from "../modules/Auth/auth.routes";
import { tripRouter } from "../modules/Trip/trip.routes";

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
  {
    path: "/",
    route: tripRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
