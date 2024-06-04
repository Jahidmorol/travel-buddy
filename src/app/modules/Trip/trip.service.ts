import { prisma } from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { ITripFilterRequest } from "./trip.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { tripSearchAbleFields } from "./trip.constant";
import { Prisma, TravelStatus } from "../../../../prisma/generated/client";

const getAllFromDB = async (
  params: ITripFilterRequest,
  options: IPaginationOptions,
  filtersBudget: { minBudget?: string; maxBudget?: string }
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.TripWhereInput[] = [];

  const { searchTerm, ...filterData } = params;
  console.log("service", searchTerm);

  // if (params?.searchTerm) {
  //   andConditions.push({
  //     // OR: tripSearchAbleFields?.map((field) => ({
  //     destination: {
  //       contains: params?.searchTerm,
  //       mode: "insensitive",
  //     },
  //     // })),
  //   });
  // }
  if (params?.searchTerm) {
    andConditions.push({
      OR: tripSearchAbleFields?.map((field) => ({
        [field]: {
          contains: params?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (
    filtersBudget.minBudget !== undefined &&
    filtersBudget.maxBudget !== undefined
  ) {
    andConditions.push({
      AND: [
        {
          budget: {
            gte: parseInt(filtersBudget.minBudget, 10),
          },
        },
        {
          budget: {
            lte: parseInt(filtersBudget.maxBudget, 10),
          },
        },
      ],
    });
  }

  console.log("and conditon", andConditions);

  const whereCondition: Prisma.TripWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.trip.findMany({
    where: whereCondition,
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
    where: whereCondition,
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

const getAllMyTripFromDB = async (
  params: ITripFilterRequest,
  options: IPaginationOptions,
  filtersBudget: { minBudget?: string; maxBudget?: string },
  user: any
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.TripWhereInput[] = [];

  const { searchTerm, ...filterData } = params;

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchAbleFields?.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (
    filtersBudget.minBudget !== undefined &&
    filtersBudget.maxBudget !== undefined
  ) {
    andConditions.push({
      AND: [
        {
          budget: {
            gte: parseInt(filtersBudget.minBudget, 10),
          },
        },
        {
          budget: {
            lte: parseInt(filtersBudget.maxBudget, 10),
          },
        },
      ],
    });
  }

  const whereCondition: Prisma.TripWhereInput = {
    AND: andConditions,
    userId: user?.id,
  };

  const result = await prisma.trip.findMany({
    where: whereCondition,
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
    where: whereCondition,
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

const getSingleTripFromDB = async (id: string) => {
  const result = await prisma.trip.findFirstOrThrow({
    where: {
      id,
    },
  });
  return result;
};

const createTrip = async (user: any, payload: any) => {
  await prisma.user.findUniqueOrThrow({
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
      description: payload.description,
      image: payload.image,
      title: payload.title,
      tripType: payload.tripType,
      userId: user.id,
    },
  });

  return createTrip;
};

const travelBuddyRequest = async (user: any, tripId: string, payload: any) => {
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

const tripDelete = async (id: string) => {
  const result = await prisma.$transaction(async (tc) => {
    await tc.travelBuddyRequest.deleteMany({
      where: {
        tripId: id,
      },
    });

    const tripDeletedData = await tc.trip.delete({
      where: {
        id,
      },
    });

    return tripDeletedData;
  });
  return result;
};

export const tripService = {
  createTrip,
  travelBuddyRequest,
  travelBuddyGet,
  getAllFromDB,
  travelBuddyRespond,
  getSingleTripFromDB,
  getAllMyTripFromDB,
  tripDelete,
};
