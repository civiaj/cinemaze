import { createClient } from "redis";
import logger from "./logger";
import { NODE_ENV, REDIS_HOST } from "../config";

export const redisClient = createClient({
    socket: {
        host: REDIS_HOST,
        port: 6379,
        reconnectStrategy: function (retries) {
            if (retries > 10) {
                return new Error("Too many retries.");
            } else {
                return retries * 500;
            }
        },
    },
});

redisClient.on("error", (error) => {
    NODE_ENV === "development" && console.log(error);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info("Redis client connected...");
    } catch (error) {
        logger.error(
            `Redis connection error. Reason: ${error instanceof Error ? error.message : error}`
        );
    }
};

export default connectRedis;
