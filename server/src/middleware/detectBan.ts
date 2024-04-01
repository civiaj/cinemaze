import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api.error";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;

        if (user.isBanned)
            return next(
                ApiError.NotAllowed(
                    `You are banned and can't use this endpoint untill ${user.banExpiration}`
                )
            );

        next();
    } catch (e) {
        next(e);
    }
};
