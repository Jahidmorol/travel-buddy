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

export const tripService = {
  createTrip,
  travelBuddyRequest,
};
