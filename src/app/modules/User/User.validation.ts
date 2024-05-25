import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const userValidation = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
};
