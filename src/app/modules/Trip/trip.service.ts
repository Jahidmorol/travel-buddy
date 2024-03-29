import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";

const createTrip = async (token: string, payload: any) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_secret as Secret
    );
  } catch (err) {
    throw new Error("You are not authrized!");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: decodedData.id,
    },
  });

  const createTrip = await prisma.trip.create({
    data: {
      destination: payload.destination,
      startDate: payload.startDate,
      endDate: payload.endDate,
      activities: payload.activities,
      budget: payload.budget,
      userId: decodedData.id,
    },
  });
  console.log(createTrip);

  return createTrip;
};

export const tripService = {
  createTrip,
};
