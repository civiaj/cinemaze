import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api.error";

export default (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.user.role;
    const isAllowed = roles.includes(role);
    if (!isAllowed) return next(ApiError.NotAllowed());

    next();
};
