import { NextFunction, Response, Request } from "express";
import { ZodSchema } from "zod";

export default (shema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        shema.parse({ body: req.body, params: req.params, query: req.query });
        next();
    } catch (e) {
        next(e);
    }
};
