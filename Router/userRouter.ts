import { Router } from "express";
import {
  CreateUser,
  RemoveUserImage,
  SignInUser,
  findAllUsers,
  findOneUser,
  updateUser,
  updateUserImage,
} from "../Controller/UserController";
import ViewImage from "../config/multer";

const router = Router();

router.route("/createUser").post(CreateUser);
router.route("/signIn").post(SignInUser);
router.route("/oneUser/:userID").get(findOneUser);
router.route("/allusers").get(findAllUsers);
router.route("/:userID/updateUser").patch(updateUser);
router.route("/:userID/updateuserImage").patch(ViewImage, updateUserImage);
router.route("/:userID/RemoveuserImage").patch(RemoveUserImage);

export default router;
