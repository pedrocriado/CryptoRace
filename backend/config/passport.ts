import { Strategy as LocalStrategy } from "passport-local"; 
import passport from "passport"; // Import passport
import { User, UserModel } from "../models/User"; // Adjust the path based on your project

//TODO: fix all the error introduced from switching from javascript to typescript
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

  passport.serializeUser((user:typeof User, cb: (error: any, id?: string) => void) => {
    console.log("Serializing user:", user);
    process.nextTick(() => {
      cb(null, user.userId); // Replace `userId` with the correct field in your User schema
    });
  });

  passport.deserializeUser(async (id: string, cb: (error: any, user?: User | null) => void) => {
    console.log("Deserializing user with id:", id);
    try {
      const user = await UserModel.findOne({ userId: id }); // Query for the user by ID
      console.log("Deserialized user:", user);

      if (!user) {
        return cb(new Error("User not found."));
      }

      process.nextTick(() => {
        return cb(null, user);
      });
    } catch (error) {
      cb(error);
    }
  });
};

export default configurePassport;
