import express from "express";

const userRoute = "ok";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
