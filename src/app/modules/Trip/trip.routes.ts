import express from "express";
import { tripController } from "./trip.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/trips", auth(UserRole.USER), tripController.createTrip);
router.post(
  "/trip/:tripId/request",
  auth(UserRole.USER),
  tripController.travelBuddyRequest
);

router.get(
  "/travel-buddies/:tripId",
  auth(UserRole.USER),
  tripController.travelBuddyGet
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(UserRole.USER),
  tripController.travelBuddyRequest
);

export const tripRouter = router;
