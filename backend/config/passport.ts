import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
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

  passport.deserializeUser(async (_id: ObjectId, done) => {
    const user = await UserModel.findById(_id);
    console.log(user);
    done(null, user);
  });
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect("/");
};