import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { tripService } from "./trip.service";

const createTrip = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  const result = await tripService.createTrip(token, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Trip created successfully",
    data: result,
  });
});

export const tripController = {
  createTrip,
};
