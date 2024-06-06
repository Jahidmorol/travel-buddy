import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TravelStatus, UserActive } from "../../../../prisma/generated/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

const createUserIntoDB = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userAllReadyExist = await prisma.user.findFirst({
    where: {
      email: payload?.email,
    },
  });

  if (userAllReadyExist) {
    throw new ApiError(
      409,
      `User all ready registration ${payload?.email} this email!`
    );
  }

  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createUser;
  });

  return result;
};

const getAllUser = async (user: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const adminDetails = await prisma.user.findFirst({
    where: {
      id: user?.id,
      role: user?.role,
    },
  });

  if (!adminDetails) {
    throw new ApiError(404, "Admin is not found!");
  }

  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.user.count({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getDashboardData = async (user: any) => {
  const adminDetails = await prisma.user.findFirst({
    where: {
      id: user?.id,
      role: user?.role,
    },
  });

  if (!adminDetails) {
    throw new ApiError(404, "Admin is not found!");
  }
  const totalTrip = await prisma.trip.count({});
  const totalUser = await prisma.user.count({});
  const totalActiveUser = await prisma.user.count({
    where: {
      isActive: UserActive.ACTIVATE,
    },
  });
  const totalDeActiveUser = await prisma.user.count({
    where: {
      isActive: UserActive.DEACTIVATE,
    },
  });
  const totalTripRequest = await prisma.travelBuddyRequest.count({});
  const totalTripRequestPending = await prisma.travelBuddyRequest.count({
    where: {
      status: TravelStatus.PENDING,
    },
  });
  const totalTripRequestApproved = await prisma.travelBuddyRequest.count({
    where: {
      status: TravelStatus.APPROVED,
    },
  });
  const totalTripRequestRejected = await prisma.travelBuddyRequest.count({
    where: {
      status: TravelStatus.REJECTED,
    },
  });

  return {
    totalTrip,
    totalUser,
    totalActiveUser,
    totalDeActiveUser,
    totalTripRequest,
    totalTripRequestPending,
    totalTripRequestApproved,
    totalTripRequestRejected,
  };
};

const updateUserInfo = async (user: any, payload: any, id: string) => {
  const adminDetails = await prisma.user.findFirst({
    where: {
      id: user?.id,
      role: user?.role,
    },
  });

  if (!adminDetails) {
    throw new ApiError(404, "Admin is not found!");
  }

  const userInfo = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  if (!userInfo) {
    throw new ApiError(404, "User is not found!");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserRole = async (user: any, payload: any, id: string) => {
  const adminDetails = await prisma.user.findFirst({
    where: {
      id: user?.id,
      role: user?.role,
    },
  });

  if (!adminDetails) {
    throw new ApiError(404, "Admin is not found!");
  }

  const userInfo = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  if (!userInfo) {
    throw new ApiError(404, "User is not found!");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};
export const userService = {
  createUserIntoDB,
  getAllUser,
  updateUserInfo,
  updateUserRole,
  getDashboardData,
};
