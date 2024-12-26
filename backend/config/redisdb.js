const redis = require('redis');

require('dotenv').config();

async function connectToRedisDB() {
    const client = redis.createClient({
        url: process.env.REDIS_URL
    });

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect()
    .then(() => {
        console.log("You successfully connected to Redis!");
    })
    .catch(error => {
        console.error("error connecting to Redis:", error);
    });
}

module.exports = connectToRedisDB;
