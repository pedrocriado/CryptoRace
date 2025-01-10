import { Request, Response } from "express";
import redis from "../config/redisdb";
import tryCatch from "../utils/tryCatch";
import createApiResponse from "../utils/apiResponse";
import MessageTypes from "../utils/messageTypes";
import { User } from "../models/User";

//Helper function to conver the number of seconds into minutes:seconds
//This was done because Redis only score the bigest because and I cant insert 
//values like 4:52 becuase it would be ranked bellow 5:54.
const convertScoreToTime = (score: number): string => {
    const minutes = Math.floor(score / 60);
    const seconds = score % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getLeaderboard = tryCatch(async (req: Request, res: Response) => {
    const leaderboard = await redis.zrevrange("Leaderboard", 0, 9, "WITHSCORES");

    const formattedLeaderboard: { username: string; time: string }[] = [];

    //Take all the values return from Redis and stores it into an 
    // object array with users and their best times
    for (let i = 0; i < leaderboard.length; i += 2) {
        const username = leaderboard[i];
        const score = -Number(leaderboard[i + 1]);
        const time = convertScoreToTime(score);
        formattedLeaderboard.push({ username, time });
    }

    //I don't want to make 2 seperate API call to generate the leaderboard, 
    //so I am getting the logged in users stats.
    //The user info will only be show if the user is logged in.
    let userStats: { username: string, time: string, userRank: number | null, userPercentile: number | null } | null = null;
    if (req.isAuthenticated()) {
        //step 1: make sure the user is in the leaderboard.
        const user = req.user as User;
        const rank = await redis.zrevrank("Leaderboard", user.username);

        if (rank !== null) {
            //step 2: take all the user information from the leaderboard.
            const userScore = -Number(await redis.zscore("Leaderboard", user.username));
            const totalUsers = await redis.zcard("Leaderboard");
            const userRank = rank + 1;

            //step 3: calculates the time and percentile of the user.
            const time = convertScoreToTime(userScore);
            const userPercentile = userRank !== null ? ((totalUsers - userRank) / totalUsers) * 100 : null;
            userStats = {
                "username": user.username,
                "time": time,
                "userRank": userRank,
                "userPercentile": userPercentile
            }
        }
    }

    return res.status(200).json(
        createApiResponse(
            true,
            MessageTypes.SUCCESS,
            'Leaderboard added successfully!',
            {
                "leaderboard": formattedLeaderboard,
                "userStats": userStats
            }
        )
    );
});

//
export const addUser = tryCatch(async (req: Request, res: Response) => {
    const personalBest = req.body.personalBest;
    const user = req.user as User;
    await redis.zadd("Leaderboard", -personalBest, user.username);
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
