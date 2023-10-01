/** @format */
import passport from "passport";
import GitHub from "passport-github2";
import { environemtVariable } from "../env/environment";

const GitHubStrategy = GitHub.Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: environemtVariable.github_id,
      clientSecret: environemtVariable.github_secret,
      callbackURL: environemtVariable.callbackUrl2,
    },
    function (accessToken, refreshToken, profile, done) {
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
