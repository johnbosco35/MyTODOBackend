/** @format */

import mongoose from "mongoose";
import { environemtVariable } from "../env/environment";

const URI: any = environemtVariable.mongodb_string;

export const DBconnect = () => {
  try {
    const connect = mongoose.connect(URI);
    console.log(`DB is now Connected`);
  } catch (error) {
    console.log(error);
  }
};
