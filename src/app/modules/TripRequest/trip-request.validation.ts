import { z } from "zod";

const tripRequestStatusValidation = z.object({
  body: z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"], {
      required_error: "Provide Status PENDING, APPROVED Or REJECTED!",
    }),
  }),
});

export const tripRequestValidation = {
  tripRequestStatusValidation,
};
