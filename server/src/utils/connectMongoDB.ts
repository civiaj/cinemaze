import { MONGO_URL } from "../config";
import logger from "./logger";
import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        logger.info("MongoDB connection successful");
    } catch (error) {
        logger.error(
            `Could not connect to database. Reason: ${
                error instanceof Error ? error.message : error
            }`
        );
    }
};

export default connectMongoDB;
