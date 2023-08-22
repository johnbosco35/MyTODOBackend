/** @format */

import express from "express";
import { Application } from "express-serve-static-core";
import { DBconnect } from "./config/DB";
import { Mainapp } from "./main";
import { environemtVariable } from "./env/environment";

const app: Application = express();

const port: Number | any = process.env.port;
Mainapp(app);
DBconnect();

const server = app.listen(environemtVariable.port, () => {
  console.log("Server is now on");
});

process.on("unhandledRejection", (error: any) => {
  console.log("unhandledRejection", error);
  process.exit(1);
});
process.on("uncaughtException", (reason: any) => {
  console.log("uncaughtException", reason);

  server.close(() => {
    process.exit(1);
  });
});
