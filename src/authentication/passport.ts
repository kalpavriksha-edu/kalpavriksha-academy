import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import LoginModel from '../model/loginRegisterModel';
import {dbConfig} from '../config/dbConfig';

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
        const existingUser = await LoginModel.findOne({ where: { googleId: profile.id } });

        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await LoginModel.create({
          id: profile.id,
          name: profile.name,
        });

        return done(null, newUser);
      } catch (error) {
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
