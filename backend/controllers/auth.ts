import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User, UserModel } from "../models/User";
import { GameModel } from "../models/Game";
import { LobbyModel } from "../models/Lobby";
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";
import tryCatch from "../utils/tryCatch";

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
        createApiResponse(true, MessageTypes.SUCCESS, 'Login Successful!')
      );
    });
  })(req, res, cb);
};

export const register = tryCatch(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(
      createApiResponse(false, MessageTypes.ERROR, 'Username and password are required.')
    );
  }

  // Check if username already exists
  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    return res.status(400).json(
      createApiResponse(false, MessageTypes.ERROR, 'Username already exists.')
    );
  }

  // Create a new user
  const user = new UserModel({ username, email, password });

  // Save the user to the database
  await user.save();

  return res.status(200).json(
    createApiResponse(true, MessageTypes.SUCCESS, 'User registered successfully!')
  );

});

export const logout = tryCatch(async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json(
        createApiResponse(false, MessageTypes.ERROR, 'An error occurred during logout.')
      );
    }
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json(
          createApiResponse(false, MessageTypes.ERROR, 'An error occurred while destroying the session.')
        );
      }
      res.clearCookie('connect.sid'); // Clear user session
      return res.json(createApiResponse(true, MessageTypes.SUCCESS, 'Logout successful!'));
    });
  });

});

//TODO: delete the Party after making that functionality.
export const deleteAccount = tryCatch(async (req: Request, res: Response) => {
  
  const user = req.user as User;

  const deletedUser = await UserModel.findByIdAndDelete(user._id);

  if (!deletedUser) {
    return res.status(404).json(
      createApiResponse(false, MessageTypes.ERROR, 'User not found.')
    );
  }

  //if the user created a lobby then it will get deleted
  const deletedLobby = await LobbyModel.findOneAndDelete({ createdBy: deletedUser._id});

  //if the lobby existed then it will also delete the Game model
  if(deletedLobby) {
    await GameModel.findOneAndDelete({ lobbyId: deletedLobby._id});
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
});