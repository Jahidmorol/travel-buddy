import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("password not match!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      id: user.id,
      role: user.role,
    },

    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  return {
    accessToken,
    user,
    refreshToken,
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
  console.log(payload);

  const userData = await prisma.user.findUniqueOrThrow({
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

export const AuthService = {
  loginUser,
  UserProfile,
  UserProfileEdit,
};
