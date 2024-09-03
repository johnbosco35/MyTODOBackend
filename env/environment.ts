

import dotenv from "dotenv";

dotenv.config();

export const environemtVariable = {
  port: process.env.port!,
  mongodb_string: process.env.mongodb_string! as any,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secert: process.env.api_secert,
  google_id: process.env.google_id,
  google_secret: process.env.google_secret,
  github_id: process.env.github_id,
  github_secret: process.env.github_secret,
  google_refreshtoken: process.env.google_refreshtoken,
  accessToken: process.env.accessToken,
  google_redirect: process.env.google_redirect,
  CLIENT_ID: process.env.client_id,
  CLIENTSECRET: process.env.clientSecret,
  CALLBACKURL: process.env.callbackUrl,
  callbackUrl2: process.env.callbachUrl2,
};
