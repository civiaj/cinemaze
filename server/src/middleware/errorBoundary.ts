import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api.error";
import { ZodError } from "zod";
import logger from "../utils/logger";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message ? err.message : err);
    if (err instanceof ApiError)
        return res.status(err.status).json({ message: err.message, errors: err.errors });

    if (err instanceof ZodError)
        return res.status(400).json({
            message: "Ошибка валидации",
            errors: err.errors.map((error) => error.message),
        });

    return res
        .status(500)
        .json({ message: "Ошибка сервера", errors: [err instanceof Error ? err.message : err] });
};
