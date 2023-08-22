/** @format */

import { Document, Schema, model } from "mongoose";
import { notify } from "../util/Interfaces";

interface iNotify extends notify, Document {}

const notifyShema = new Schema({
  message: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

export default model<iNotify>("notifys", notifyShema);
