import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createUserIntoDB = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

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
    await transactionClient.userProfile.create({
      data: {
        age: payload.age,
        bio: payload.bio,
        userId: createUser.id,
      },
    });

    return createUser;
  });

  return result;
};

export const userService = {
  createUserIntoDB,
};
