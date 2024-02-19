import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL, PORT } from "../config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import router from "./router/router";
import errorBoundary from "./middleware/errorBoundary";
import userAgent from "./middleware/userAgent";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: [CLIENT_URL, "http://192.168.1.59:5173"] }));
app.use(userAgent);
app.use("/api", router);
app.use(errorBoundary);

app.listen(PORT, async () => {
    logger.info(`App is running on Port: ${PORT}`);
    await connect();
});
