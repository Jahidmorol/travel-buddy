import express from "express";
import { userRoute } from "../modules/User/User.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
