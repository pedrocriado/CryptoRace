import { Strategy as LocalStrategy } from "passport-local"; 
import passport from "passport";
import { User, UserModel } from "../models/User";

const configurePassport = (passport: passport.PassportStatic): void => {
  passport.use(
    new LocalStrategy(
      async (userName: string, password: string, cb: (error: any, user?: User | false, options?: { message: string }) => void) => {
        try {
          const user = await UserModel.findOne({ userName }); // Query for the user
          if (!user) {
            return cb(null, false, { message: "Username not found." });
          }

          const valid = await user.authenticate(password);
          if (!valid) {
            return cb(null, false, { message: "Incorrect Password." });
          }

          return cb(null, user);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default configurePassport;
