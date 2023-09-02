/** @format */

import passport from "passport";
import { environemtVariable } from "../env/environment";
import UserModel from "../Model/UserModel";

var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: environemtVariable.CLIENT_ID,
      clientSecret: environemtVariable.CLIENTSECRET,
      callbackURL: environemtVariable.CALLBACKURL,
      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await UserModel.create({
            googleId: profile.id,
            Name: profile.displayName,
            Email: profile.email,
          });
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
