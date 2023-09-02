/** @format */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./Router/userRouter";
import taskRouter from "./Router/taskRouter";
import passport from "passport";
import session from "express-session";

export const Mainapp = (app: Application) => {
  app.use(express.json()).use(cors());
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Server is still active🚀🚀🚀",
    });
  });
  app.get("/check", (req: Request, res: Response) => {
    res.send(`<a href= "/veri/google">Authenicate with google</a>`);
  });

  app.get(
    "/veri/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://127.0.0.1:5173/",
      failureRedirect: "/google/callback/failure",
    })
  );

  app.get("/google/callback/protect", (req: any, res: any) => {
    return res.send(`hello ${req?.user?.displayName}`);
  });
  app.get("/google/callback/failure", (req, res) => {
    return res.send("failed to authnticate");
  });
  app.use("/api/v1", router);
  app.use("/api/v1", taskRouter);
};
