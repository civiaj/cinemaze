import { NextFunction, Response, Request } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.locals.ua = req.get("User-Agent");
    next();
};
