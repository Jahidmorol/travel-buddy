import { TravelStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createTrip = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  const createTrip = await prisma.trip.create({
    data: {
      destination: payload.destination,
      startDate: payload.startDate,
      endDate: payload.endDate,
      activities: payload.activities,
      budget: payload.budget,
      userId: user.id,
    },
  });

  return createTrip;
};

const travelBuddyRequest = async (user: any, tripId: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  const tripData = await prisma.trip.findUniqueOrThrow({
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
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  const tripBuddyData = await prisma.travelBuddyRequest.findUniqueOrThrow({
    where: {
      id: buddyId,
    },
  });

  const tripBuddyUpdateData = await prisma.travelBuddyRequest.update({
    where: {
      id: buddyId,
    },
    data,
  });

  return tripBuddyUpdateData;
};

export const tripService = {
  createTrip,
  travelBuddyRequest,
  travelBuddyGet,
  travelBuddyRespond,
};
