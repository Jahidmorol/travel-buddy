import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";
import { tripRequestController } from "./trip-request.controller";

const router = express.Router();

router.post(
  "/:tripId",
  auth(UserRole.USER),
  tripRequestController.travelBuddyRequest
);

router.get(
  "/",
  auth(UserRole.USER),
  tripRequestController.getAllTravelBuddyRequest
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(UserRole.USER),
  tripRequestController.travelBuddyRespond
);

export const tripRequestRouter = router;
