import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL, PORT, STATIC_PROFILE_PATH, STATIC_PROFILE_ROUTE } from "./config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import router from "./router/router";
import errorBoundary from "./middleware/errorBoundary";
import useragent from "express-useragent";
import userAgent from "./middleware/userAgent";
import path from "path";
import "./schedules/unbanSchedule";
import ApiError from "./exceptions/api.error";

const app = express();

app.use(express.json());

app.use(STATIC_PROFILE_ROUTE, express.static(path.join(__dirname, `..${STATIC_PROFILE_PATH}`)));

app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: CLIENT_URL,
    })
);
app.options("*", cors());

app.use(useragent.express());
app.use(userAgent);

app.use("/api", router);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
    const err = ApiError.BadRequest(`Route ${req.originalUrl} not found`);
    next(err);
});

app.use(errorBoundary);

app.listen(PORT, async () => {
    logger.info(`App is running on Port: ${PORT}`);
    await connect();
});
