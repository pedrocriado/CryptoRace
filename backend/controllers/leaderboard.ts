import { Request, Response } from "express";
import redis from "../config/redisdb";
import tryCatch from "../utils/tryCatch";
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";

export const addUser = tryCatch(async (req: Request, res: Response) => {
    const { username, personalBest } = req.body;
    await redis.zadd("Leaderboard", personalBest, username);
    return res.status(200).json(
        createApiResponse(true, MessageTypes.SUCCESS, 'User score added successfully!')
    );
});

export const getLeaderboard = tryCatch(async (req: Request, res: Response) => {
    const leaderboard = await redis.zrevrange("Leaderboard", 0, 9, "WITHSCORES");
    return res.status(200).json(
        createApiResponse(
            true,
            MessageTypes.SUCCESS,
            'Leaderboard added successfully!',
            leaderboard
        )
    );
});

//TODO: learn wtf is wrong with this code :(
export const getUserRank = tryCatch(async (req: Request, res: Response) => {
    const { username } = req.body;
    const rank = await redis.zrevrank("leaderboard", username);
    const userRank = rank !== null ? rank + 1 : null;
    return res.status(200).json(
        createApiResponse(
            true, 
            MessageTypes.SUCCESS,
            'User rank retrived successfully!',
            { rank, userRank}
        )
    );
});
