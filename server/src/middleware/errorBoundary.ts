import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api.error";
import { ZodError } from "zod";
import logger from "../utils/logger";
import axios from "axios";

export default (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err instanceof Error ? err.message : err);
    if (err instanceof ApiError)
        return res.status(err.status).json({ message: err.message, errors: err.errors });

    if (err instanceof ZodError)
        return res.status(400).json({
            message: "Ошибка валидации",
            errors: err.errors.map((error) => error.message),
        });
    if (axios.isAxiosError(err)) {
        if (err.response && err.response.data.message) {
            return res.status(err.response.status).json({
                message: err.response.data.message,
            });
        } else if (err.request) {
            return res.status(err.status ?? 400).json({
                message: err.request,
            });
        } else {
            return res.status(err.status ?? 400).json({
                message: err.message,
            });
        }
    }
    return res.status(500).json({
        message: "Неизвестная ошибка",
        errors: [err instanceof Error ? err.message : err],
    });
};
