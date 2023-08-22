/** @format */

import { Router } from "express";
import {
  CreateUser,
  SignInUser,
  findAllUsers,
  findOneUser,
} from "../Controller/UserController";
import ViewImage from "../config/multer";

const router = Router();

router.route("/createUser").post(ViewImage, CreateUser);
router.route("/signIn").post(SignInUser);
router.route("/oneUser/:userID").get(findOneUser);
router.route("/allusers").get(findAllUsers);

export default router;
