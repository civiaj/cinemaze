import { NextFunction, Response, Request } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.ua = JSON.stringify({
            os: req.useragent?.os,
            browser: req.useragent?.browser,
            version: req.useragent?.version,
        });
        next();
    } catch (e) {
        next(e);
    }
};
