import cron from "node-cron";
import userService from "../service/user.service";
import logger from "../utils/logger";

cron.schedule(
    "0 * * * *",
    async () => {
        logger.info("Unbanning users...");
        const number = await userService.checkForExpiredBan();
        logger.info(`${number} users were unbanned.`);
    },
    { scheduled: true, name: "unban users" }
);
