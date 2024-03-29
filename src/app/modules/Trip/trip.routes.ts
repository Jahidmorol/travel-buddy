import express from "express";
import { tripController } from "./trip.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/trips", auth(UserRole.USER), tripController.createTrip);

export const tripRouter = router;
