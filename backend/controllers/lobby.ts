import { Request, Response } from "express";
import tryCatch from "../utils/tryCatch";
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";
import { User } from "../models/User";
import { GameModel } from "../models/Game";
import { LobbyModel } from "../models/Lobby";

//TODO: fix the participants array.
export const createLobby = tryCatch(async (req: Request, res: Response) => {
    const { lobbyName, privateLobby, algorithms, playerCap, password } = req.body;

    const user = req.user as User;

    // Check if username already exists
    const usersRoom = await LobbyModel.findOne({ createdBy: user });

    // Users are only allowed to make 1 lobby
    if (usersRoom) {
        return res.status(400).json(
            createApiResponse(false, MessageTypes.ERROR, 'Username still has a lobby open.')
        );
    }

    const lobby = new LobbyModel({
        lobbyName: lobbyName,
        participants: [user._id, user.username],
        createdBy: user._id,
        createrName: user.username,
        private: privateLobby,
        algorithms: algorithms,
        playerCap: playerCap,
        password: password
    });

    await lobby.save();

    return res.status(200).json(
        createApiResponse(true, 
            MessageTypes.SUCCESS, 
            'User lobby created successfully!', 
            lobby._id)
    );
})

export const joinLobby = tryCatch(async (req:Request, res:Response) => {
    const { lobbyId, password } = req.body;

    const lobby = await LobbyModel.findById(lobbyId);

    if(!lobby) {
        return res.status(400).json(
            createApiResponse(false, 
                MessageTypes.ERROR, 
                'The lobby that you are currently tryign to enter does not exist', 
                {deleteLobby: true, allowed: false})
        );
    }

    if(lobby.private) {
        
        if(!(await lobby.validateLobbyPassword(password))) {
            return res.status(400).json(
                createApiResponse(
                    false, 
                    MessageTypes.ERROR, 
                    'The lobby that you are currently tryign to enter does not exist', 
                    {deleteLobby: false, allowed: false})
            );
        } 
    }

    return res.status(200).json(
        createApiResponse(true, 
            MessageTypes.SUCCESS, 
            'User successfully joined the lobby!', 
            {deleteLobby: false, allowed: true})
    );
})

export const deleteLobby = tryCatch(async (req:Request, res:Response) => {
    const user = req.user as User;

    // Check if username already exists
    const deletedLobby = await LobbyModel.findOneAndDelete({ createdBy: user._id });
    
    // Users are only allowed to make 1 lobby
    if (!deletedLobby) {
        return res.status(400).json(
            createApiResponse(false, MessageTypes.ERROR, 'Username still has a lobby open.')
        );
    }

    await GameModel.findOneAndDelete({ lobbyId: deletedLobby._id});

    return res.status(200).json(
        createApiResponse(true, MessageTypes.SUCCESS, 'User lobby created successfully!', deletedLobby)
    );
})