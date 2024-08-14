import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api.error";
import { ZodError } from "zod";
import logger from "../utils/logger";
import axios from "axios";

export default (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err instanceof Error ? err.message : err);
    if (err instanceof ApiError)
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    else if (err instanceof ZodError)
        return res.status(400).json({
            message: "Ошибка валидации",
            errors: err.errors.map((error) => error.message),
        });
    else if (axios.isAxiosError(err)) {
        // Do not propagate 401 to clients from external apis.
        let status = err?.response?.status;
        if (!status || status === 401) status = 502;

        if (err.response && err.response.data.message) {
            return res.status(status).json({
                message: err.response.data.message,
            });
        } else if (err.request) {
            return res.status(status).json({
                message: err.request,
            });
        } else {
            return res.status(status).json({
                message: err.message,
            });
        }
    }
    return res.status(500).json({
        message: "Неизвестная ошибка",
        errors: [err instanceof Error ? err.message : err],
    });
};
