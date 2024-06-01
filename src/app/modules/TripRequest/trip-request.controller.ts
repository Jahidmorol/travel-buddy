import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { tripRequestService } from "./trip-request.service";

const travelBuddyRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { tripId } = req.params;

    const result = await tripRequestService.travelBuddyRequest(user, tripId);

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

    const result = await tripRequestService.travelBuddyGet(user, tripId);

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

    const result = await tripRequestService.travelBuddyRespond(
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
export const tripRequestController = {
  travelBuddyRequest,
  travelBuddyGet,

  travelBuddyRespond,
};
