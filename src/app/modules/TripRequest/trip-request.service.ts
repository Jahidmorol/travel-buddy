import { prisma } from "../../../shared/prisma";

import { TravelStatus, UserActive } from "../../../../prisma/generated/client";

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

const getAllTravelBuddyRequest = async (user: any) => {
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

const travelBuddyUpdateStatus = async (
  user: any,
  buddyId: string,
  data: any
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      isActive: UserActive.ACTIVATE,
    },
  });

  await prisma.travelBuddyRequest.findUniqueOrThrow({
    where: { id: buddyId },
  });

  const tripBuddyUpdateData = await prisma.travelBuddyRequest.update({
    where: {
      id: buddyId,
    },
    data: {
      status: data.status,
    },
  });

  return tripBuddyUpdateData;
};

export const tripRequestService = {
  travelBuddyRequest,
  getAllTravelBuddyRequest,
  travelBuddyUpdateStatus,
};
