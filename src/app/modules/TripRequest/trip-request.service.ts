import { prisma } from "../../../shared/prisma";

import { TravelStatus } from "../../../../prisma/generated/client";

const travelBuddyRequest = async (user: any, tripId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
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

const travelBuddyGet = async (user: any, tripId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  // const tripData = await prisma.trip.findUniqueOrThrow({
  //   where: {
  //     id: tripId,
  //   },
  // });

  // console.log(tripData);

  const tripBuddyData = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
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
    },
  });

  return tripBuddyData;
};

const travelBuddyRespond = async (user: any, buddyId: string, data: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
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
  travelBuddyGet,

  travelBuddyRespond,
};
