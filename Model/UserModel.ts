/** @format */

import mongoose from "mongoose";
import { user } from "../util/Interfaces";

interface Iuser extends user, mongoose.Document {}

const UserSchema = new mongoose.Schema<user>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    Confirmpassword: {
      type: String,
      required: true,
    },
    UserImage: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    Task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    assignedTask: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    receivedTask: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    notification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notifys",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Iuser>("User", UserSchema);
