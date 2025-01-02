import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

const connectToRedisDB = async () => {
    const url = process.env.REDIS_URL;

    if(!url){
        throw new Error("REDIS_URL is not defined in the environment variables.")
    }

    const client = createClient({ url: url });

    client.on('error', err => console.log('Redis Client Error', err));

    try {
        await client.connect();
        console.log("Connected to Redis");
        return client;
    } catch (error) {
        console.error(`Error connecting to Redis ${error}`);
        throw error;
    }
}

export default connectToRedisDB;
