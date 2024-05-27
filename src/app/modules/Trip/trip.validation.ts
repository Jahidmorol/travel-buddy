import { z } from "zod";

const createTripValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required!",
      })
      .min(1, "Title cannot be empty"),
    destination: z
      .string({
        required_error: "Destination is required!",
      })
      .min(1, "Destination cannot be empty"),
    image: z
      .string({
        required_error: "Image is required!",
      })
      .url("Image must be a valid URL"),
    startDate: z.string({
      required_error: "Start Date is required!",
    }),
    endDate: z.string({
      required_error: "End Date is required!",
    }),
    description: z
      .string({
        required_error: "Description is required!",
      })
      .min(1, "Description cannot be empty"),
    tripType: z
      .string({
        required_error: "Trip Type is required!",
      })
      .min(1, "Trip Type cannot be empty"),
    activities: z.array(z.string()).min(1, "At least one activity is required"),
    budget: z
      .number({
        required_error: "Budget is required!",
      })
      .int("Budget must be an integer"),
  }),
});

export const tripValidation = {
  createTripValidation,
};
