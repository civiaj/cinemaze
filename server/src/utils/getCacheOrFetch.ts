import cacheService from "../service/cache.service";
import logger from "./logger";

export const getCacheOrFetch = async <T>(
    key: string,
    fetchFunction: () => Promise<T>
): Promise<T> => {
    const data = await cacheService.get(key);
    if (data) {
        logger.info(`CACHED DATA. KEY: ${key}`);
        return data;
    } else {
        const fetchedData = await fetchFunction();
        await cacheService.set(key, fetchedData);
        return fetchedData;
    }
};
