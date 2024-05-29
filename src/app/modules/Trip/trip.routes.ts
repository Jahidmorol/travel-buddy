import express from "express";
import { tripController } from "./trip.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";
import validationRequest from "../../middlewares/ValidationRequest";
import { tripValidation } from "./trip.validation";

const router = express.Router();

router.get("/my-trips", auth(UserRole.USER), tripController.getAllMyTripFromDB);

router.get("/trips", tripController.getAllFromDB);

router.get(
  "/trips/:id",
  auth(UserRole.USER),
  tripController.getSingleTripFromDB
);

router.get(
  "/travel-buddies/:tripId",
  auth(UserRole.USER),
  tripController.travelBuddyGet
);

router.post(
  "/trips",
  auth(UserRole.USER),
  validationRequest(tripValidation.createTripValidation),
  tripController.createTrip
);

router.post(
  "/trip/:tripId/request",
  auth(UserRole.USER),
  tripController.travelBuddyRequest
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(UserRole.USER),
  tripController.travelBuddyRespond
);

export const tripRouter = router;
