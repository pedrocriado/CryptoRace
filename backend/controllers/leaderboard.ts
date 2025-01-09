import { Request, Response } from "express";
import redis from "../config/redisdb";
import tryCatch from "../utils/tryCatch";
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";
import { User } from "../models/User";

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

export const addUser = tryCatch(async (req: Request, res: Response) => {
    const personalBest: number = req.body;
    const user = req.user as User;
    await redis.zadd("Leaderboard", personalBest, user.username);
    return res.status(200).json(
        createApiResponse(
            true, 
            MessageTypes.SUCCESS, 
            'User score added successfully!'
        )
    );
});

export const getUserRank = tryCatch(async (req: Request, res: Response) => {
    const user = req.user as User;
    const rank = await redis.zrevrank("Leaderboard", user.username);
    const userRank = rank !== null ? rank + 1 : null;
    return res.status(200).json(
        createApiResponse(
            true,
            MessageTypes.SUCCESS,
            'User rank retrived successfully!',
            userRank
        )
    );
});
