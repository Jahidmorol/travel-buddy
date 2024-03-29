import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import cookiParser from "cookie-parser";

import httpStatus from "http-status";
import router from "./app/routers";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();
app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

app.get("/", (req, res) => {
  res.send("Travel buddy matching srver is running!!");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
