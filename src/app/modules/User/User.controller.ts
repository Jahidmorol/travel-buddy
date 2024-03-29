import { Request, RequestHandler, Response } from "express";
import { userService } from "./User.service";

const createUser: RequestHandler = async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userService.createUserIntoDB();
  console.log("result : ", result);
};

export const userController = {
  createUser,
};
