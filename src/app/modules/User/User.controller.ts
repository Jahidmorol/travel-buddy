import { Request, Response } from "express";
import { userService } from "./User.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const getAllUser = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getAllUser(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All User retrieved successfully!",
      data: result,
    });
  }
);

const updateUserInfo = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    const result = await userService.updateUserInfo(user, req.body, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User info update successfully!",
      data: result,
    });
  }
);
const updateUserRole = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    const result = await userService.updateUserInfo(user, req.body, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User role update successfully!",
      data: result,
    });
  }
);
const getDashboardData = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getDashboardData(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Dashboard data retrieved successfully!",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getAllUser,
  updateUserInfo,
  getDashboardData,
  updateUserRole,
};
