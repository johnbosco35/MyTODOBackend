/** @format */

import { v2 as cloudinary } from "cloudinary";
import { environemtVariable } from "../env/environment";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: environemtVariable.cloud_name,
  api_key: environemtVariable.api_key,
  api_secret: environemtVariable.api_secert,
  secret: true,
});

export default cloudinary;
