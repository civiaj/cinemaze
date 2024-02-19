import { MONGO_URL } from "../../config";
import logger from "./logger";
import mongoose from "mongoose";

const connect = async () => {
    try {
        logger.info("Connecting to database...");
        await mongoose.connect(MONGO_URL);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error(
            `Could not connect to database. Reason: ${
                error instanceof Error ? error.message : error
            }`
        );
    }
};

export default connect;
