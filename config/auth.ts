/** @format */

import passport from "passport";
import { environemtVariable } from "../env/environment";
import UserModel from "../Model/UserModel";

let GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: environemtVariable.CLIENT_ID,
      clientSecret: environemtVariable.CLIENTSECRET,
      callbackURL: "http://localhost:2020/google/callback",
      // callbackURL: environemtVariable.CALLBACKURL,
      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
