import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User, UserModel } from "../models/User"; 
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";
import { tryCatch } from "../utils/tryCatch";

export const login = (req: Request, res: Response, cb: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: User | null, info: any) => {
    if (err) return cb(err);
    if (!user) {
      return res.status(401).json(
        createApiResponse(false, MessageTypes.ERROR, info?.message || 'Authentication failed.')
      );
    }

    req.logIn(user, (err) => {
      console.log('Session after login:', req.session);
      if (err) return cb(err);

      res.json(
        createApiResponse(true, MessageTypes.SUCCESS, 'Login Successful!', {
          username: user.username,
          Id: user._id,
        })
      );
    });
  })(req, res, cb);
};

export const register = tryCatch(async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json(
      createApiResponse(false, MessageTypes.ERROR, 'Username and password are required.')
    );
  }

  try {
    // Check if username already exists
    const existingUser = await UserModel.findOne({ userName });

    if (existingUser) {
      return res.status(400).json(
        createApiResponse(false, MessageTypes.ERROR, 'Username already exists.')
      );
    }

    // Create a new user
    const user = new UserModel({ userName, password });

    // Save the user to the database
    await user.save();

    return res.status(200).json(
      createApiResponse(true, MessageTypes.SUCCESS, 'User registered successfully!')
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      createApiResponse(false, MessageTypes.ERROR, 'An error occurred while registering.')
    );
  }
});

export const logout = tryCatch(async (req: Request, res: Response) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json(
          createApiResponse(false, MessageTypes.ERROR, 'An error occurred during logout.')
        );
      }
      req.session.destroy((err:any) => {
        if (err) {
          return res.status(500).json(
            createApiResponse(false, MessageTypes.ERROR, 'An error occurred while destroying the session.')
          );
        }
        res.clearCookie('connect.sid'); // Clear user session
        return res.json(createApiResponse(true, MessageTypes.SUCCESS, 'Logout successful!'));
      });
    });
  } catch (error) {
    return res.status(500).json(
      createApiResponse(false, MessageTypes.ERROR, 'An error occurred while Logging Out.')
    );
  }
});

export const deleteAccount = tryCatch(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json(
      createApiResponse(false, MessageTypes.ERROR, 'User is not authenticated.')
    );
  }

  try {
    const deletedUser = await UserModel.findOneAndDelete({ userId: (req.user as User)._id });

    if (!deletedUser) {
      return res.status(404).json(
        createApiResponse(false, MessageTypes.ERROR, 'User not found.')
      );
    }

    req.logout((err) => {
      if (err) {
        return res.status(500).json(
          createApiResponse(false, MessageTypes.ERROR, 'Error logging out after account deletion.')
        );
      }

      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json(createApiResponse(true, MessageTypes.SUCCESS, 'Account deleted successfully.'));
      });
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json(
      createApiResponse(false, MessageTypes.ERROR, 'Internal server error.')
    );
  }
});