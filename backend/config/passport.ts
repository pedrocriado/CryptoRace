import { Strategy as LocalStrategy } from "passport-local";
import { Express, NextFunction } from "express";
import passport from "passport";
import { User, UserModel } from "../models/User";
import { ObjectId } from "mongoose";

export default function initPassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      async (username: string, password: string, done: (error: any, user?: User | false, options?: { message: string }) => void) => {
        try {
          
          const user = await UserModel.findOne({ username: username }); 

          if (!user) {
            return done(null, false, { message: "Username not found." });
          }

          const valid = await user.authenticate(password);
          if (!valid) {
            return done(null, false, { message: "Incorrect Password." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: ObjectId, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};