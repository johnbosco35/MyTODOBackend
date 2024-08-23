/** @format */

import mongoose from "mongoose";
import { Task } from "../util/Interfaces";

interface Itaks extends Task, mongoose.Document {}

const TaskSchema = new mongoose.Schema<Task>(
  {
    Title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
    },
    Des: {
      type: String,
    },
    TimeCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model<Itaks>("tasks", TaskSchema);
