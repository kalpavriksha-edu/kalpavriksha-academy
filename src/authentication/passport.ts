import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import LoginModel from '../model/loginRegisterModel';
import {dbConfig} from '../config/dbConfig';
import logger from '../utility/logger';

passport.use(
  new GoogleStrategy(
    {
      clientID: dbConfig.GOOGLE_CLIENT_ID,
      clientSecret: dbConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    async (request: Request, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await LoginModel.findOne({ where: { email: profile.emails[0].value } });
        if (existingUser) {
          const user = {
           displayName: profile.displayName,
         };
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        logger.error('Error in authentication callback:', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
