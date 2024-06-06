import { prisma } from "../../../shared/prisma";

import { TravelStatus, UserActive } from "../../../../prisma/generated/client";
import ApiError from "../../errors/ApiError";

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

const getAllTravelBuddyRequestUser = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  const tripRequestData = await prisma.travelBuddyRequest.findMany({
    where: {
      userId: userData?.id,
      status: TravelStatus.APPROVED,
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
          budget: true,
          endDate: true,
          startDate: true,
        },
      },
    },
  });

  return tripRequestData;
};

const getAllTravelBuddyRequestAdmin = async (user: any) => {
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
          budget: true,
          endDate: true,
          startDate: true,
        },
      },
    },
  });

  return tripRequestData;
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

  // const tripBuddyUpdateData = await prisma.travelBuddyRequest.update({
  //   where: {
  //     id: buddyId,
  //   },
  //   data: {
  //     status: data.status,
  //   },
  // });

  return tripBuddyUpdateData;
};

export const tripRequestService = {
  travelBuddyRequest,
  getAllTravelBuddyRequestUser,
  getAllTravelBuddyRequestAdmin,
  travelBuddyUpdateStatus,
};
