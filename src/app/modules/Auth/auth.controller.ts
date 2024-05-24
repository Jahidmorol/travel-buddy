import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
    },
  });
});

const UserProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthService.UserProfile(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const UserProfileEdit = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthService.UserProfileEdit(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  UserProfile,
  UserProfileEdit,
};
