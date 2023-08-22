/** @format */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./Router/userRouter";
import taskRouter from "./Router/taskRouter";

export const Mainapp = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "Server is still active🚀🚀🚀",
      });
    });
  app.use("/api/v1", router);
  app.use("/api/v1", taskRouter);
};
