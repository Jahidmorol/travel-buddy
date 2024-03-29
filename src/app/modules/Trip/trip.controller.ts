import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { tripService } from "./trip.service";

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
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);

export const tripController = {
  createTrip,
  travelBuddyRequest,
  travelBuddyGet,
};
