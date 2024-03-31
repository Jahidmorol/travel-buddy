import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { tripService } from "./trip.service";
import pick from "../../../shared/pick";
import { tripFilterAbleFieds } from "./trip.constant";

const createTrip = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await tripService.createTrip(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Trip created successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, tripFilterAbleFieds);

  const filtersbudget = pick(req.query, ["minBudget", "maxBudget"]);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await tripService.getAllFromDB(
    filters,
    options,
    filtersbudget
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});

const travelBuddyRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { tripId } = req.params;

    const result = await tripService.travelBuddyRequest(user, tripId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);

const travelBuddyGet = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { tripId } = req.params;

    const result = await tripService.travelBuddyGet(user, tripId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Potential travel buddies retrieved successfully",
      data: result,
    });
  }
);

const travelBuddyRespond = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { buddyId } = req.params;

    const result = await tripService.travelBuddyRespond(
      user,
      buddyId,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Travel buddy request responded successfully",
      data: result,
    });
  }
);
export const tripController = {
  createTrip,
  travelBuddyRequest,
  travelBuddyGet,
  getAllFromDB,
  travelBuddyRespond,
};
