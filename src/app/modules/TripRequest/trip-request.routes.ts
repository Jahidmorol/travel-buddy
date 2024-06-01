import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";
import { tripRequestController } from "./trip-request.controller";
import validationRequest from "../../middlewares/ValidationRequest";
import { tripRequestValidation } from "./trip-request.validation";

const router = express.Router();

router.post(
  "/:tripId",
  auth(UserRole.USER),
  tripRequestController.travelBuddyRequest
);

router.put(
  "/update-status/:buddyId",
  auth(UserRole.ADMIN),
  validationRequest(tripRequestValidation.tripRequestStatusValidation),

  tripRequestController.travelBuddyUpdateStatus
);

router.get(
  "/",
  auth(UserRole.USER),
  tripRequestController.getAllTravelBuddyRequest
);

// router.put(
//   "/travel-buddies/:buddyId/respond",
//   auth(UserRole.USER),
//   tripRequestController.travelBuddyRespond
// );

export const tripRequestRouter = router;
