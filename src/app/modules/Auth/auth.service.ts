import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      isActive: "ACTIVATE",
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(404, "password not match!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    user,
  };
};

const UserProfile = async (payload: any) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const UserProfileEdit = async (user: any, payload: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  const userUpdateData = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userUpdateData;
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userData) {
    throw new ApiError(406, "User not found!");
  }

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(406, "Password not match!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Change password",
  };
};

export const AuthService = {
  loginUser,
  UserProfile,
  changePassword,
  UserProfileEdit,
};
