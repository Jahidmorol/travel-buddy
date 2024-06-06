import { prisma } from "../../../shared/prisma";

import { TravelStatus, UserActive } from "../../../../prisma/generated/client";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";

const travelBuddyRequest = async (user: any, tripId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const createTrip = await prisma.travelBuddyRequest.create({
    data: {
      tripId,
      userId: user.id,
      status: TravelStatus.PENDING,
    },
  });

  return createTrip;
};

const getAllTravelBuddyRequestUser = async (
  user: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  const tripRequestData = await prisma.travelBuddyRequest.findMany({
    where: {
      userId: userData?.id,
    },
    select: {
      id: true,
      tripId: true,
      userId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      trip: {
        select: {
          title: true,
          description: true,
          destination: true,
          budget: true,
          endDate: true,
          startDate: true,
        },
      },
    },
    skip,
    take: limit,
  });

  const total = await prisma.travelBuddyRequest.count({
    where: {
      userId: userData?.id,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: tripRequestData,
  };
};

const getAllTravelBuddyRequest = async (
  user: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  const tripRequestData = await prisma.travelBuddyRequest.findMany({
    select: {
      id: true,
      tripId: true,
      userId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      trip: {
        select: {
          title: true,
          description: true,
          destination: true,
          budget: true,
          endDate: true,
          userId: true,
          startDate: true,
        },
      },
    },
    skip,
    take: limit,
  });

  const filteredTripRequestData = tripRequestData.filter(
    (request) => request.trip.userId === userData.id
  );

  return {
    meta: {
      page,
      limit,
      total: filteredTripRequestData.length,
    },
    data: filteredTripRequestData,
  };
};

const travelBuddyUpdateStatus = async (
  user: any,
  buddyId: string,
  data: any
) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  if (!userData) {
    throw new ApiError(404, "User not found!");
  }

  const buddyData = await prisma.travelBuddyRequest.findUnique({
    where: { id: buddyId },
    include: {
      trip: true,
    },
  });

  if (!buddyData) {
    throw new ApiError(404, "Trip request not found!");
  }

  let tripBuddyUpdateData;

  if (buddyData.trip.userId === user.id) {
    tripBuddyUpdateData = await prisma.travelBuddyRequest.update({
      where: {
        id: buddyId,
      },
      data: {
        status: data.status,
      },
    });
  } else {
    throw new ApiError(404, "This not you post request");
  }

  return tripBuddyUpdateData;
};

export const tripRequestService = {
  travelBuddyRequest,
  getAllTravelBuddyRequestUser,
  getAllTravelBuddyRequest,
  travelBuddyUpdateStatus,
};
