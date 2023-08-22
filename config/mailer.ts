/** @format */

import * as nodemailer from "nodemailer";
import { google } from "googleapis";
import { environemtVariable } from "../env/environment";

const GOOGLE_ID = environemtVariable.google_id;
const GOOGLE_SECRET = environemtVariable.google_secret;
const GOOGLE_REFRESHTOKEN = environemtVariable.google_refreshtoken;
const GOOGLE_REDIRECT = environemtVariable.google_redirect;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "okonkwovincent63@gmail.com",
    clientId: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    refreshToken: GOOGLE_REFRESHTOKEN,
    accessToken: environemtVariable.accessToken,
  },
});

export const Mailer = async (to, text, subject) => {
  const info = await transport.sendMail({
    from: `noreply@gmail.com<okonkwovincent63@gmail.com>`,
    to: to,
    subject: subject,
    html: text,
  });

  console.log("Message sent: %s", info.messageId);
};
