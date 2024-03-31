import { prisma } from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { ITripFilterRequest } from "./trip.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { tripSearchAbleFields } from "./trip.constant";
import { Prisma, TravelStatus } from "../../../../prisma/generated/client";

const getAllFromDB = async (
  params: ITripFilterRequest,
  options: IPaginationOptions,
  filtersbudget: any
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andCondions: Prisma.TripWhereInput[] = [];

  const { searchTerm, ...filterData } = params;

  if (params.searchTerm) {
    andCondions.push({
      OR: tripSearchAbleFields?.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (
    filtersbudget.minBudget !== undefined &&
    filtersbudget.maxBudget !== undefined
  ) {
    andCondions.push({
      AND: [
        {
          budget: {
            gte: parseInt(filtersbudget.minBudget),
          },
        },

        {
          budget: {
            lte: parseInt(filtersbudget.maxBudget),
          },
        },
      ],
    });
  }

  const whereConditon: Prisma.TripWhereInput = { AND: andCondions };

  const result = await prisma.trip.findMany({
    where: whereConditon,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.trip.count({
    where: whereConditon,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
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
  getAllFromDB,
  travelBuddyRespond,
};
