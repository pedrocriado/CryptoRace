import redis from "../config/redisdb";
import tryCatch from "../utils/tryCatch";

//TODO: test, document, and fully implement this three functions.
export const addUser = tryCatch(async (username: string, personalBest: number) => {
    await redis.zadd("Leaderboard", personalBest, username);
});

export const getLeaderboard = tryCatch(async () => {
    return await redis.zrevrange("Leaderboard", 0, 9, "WITHSCORES");
});

export const getUserRank = tryCatch(async (userId: string) => {
    const rank = await redis.zrevrank("leaderboard", userId);
    return rank !== null ? rank + 1 : null;
});
