import { redisClient } from "../utils/connectRedis";
import logger from "../utils/logger";

const CACHE_TIME = 86400;

class CacheService {
    async get(key: string) {
        try {
            const cachedData = await redisClient.get(key);
            if (cachedData) return JSON.parse(cachedData);
        } catch (error) {
            logger.error(`Error fetching data from Redis: ${error}`);
        }
    }
    async set(key: string, data: unknown) {
        try {
            return await redisClient.setEx(String(key), CACHE_TIME, JSON.stringify(data));
        } catch (error) {
            logger.error(`Error setting data in Redis: ${error}`);
        }
    }
}

export default new CacheService();
