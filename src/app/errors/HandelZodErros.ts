import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  const zodError = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const message = err.issues.map((issue: ZodIssue) => issue.message).join(". ");

  const statusCode = 400;

  return {
    statusCode,
    message: message || "Validation Error",
    errorDetails: {
      issue: zodError,
    },
  };
};

export default handleZodError;
