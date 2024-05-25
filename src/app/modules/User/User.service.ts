import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

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

export const userService = {
  createUserIntoDB,
};
