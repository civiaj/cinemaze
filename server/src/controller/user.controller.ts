import { NextFunction, Response, Request } from "express";
import userService from "../service/user.service";
import tokenService from "../service/token.service";

class UserController {
    async getMe(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            return res.status(200).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            return res.status(200).json({ data: users, count: users.length });
        } catch (e) {
            next(e);
        }
    }
    async getUserSessions(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tokenService.getUserSessions(res.locals.user.id, res.locals.ua);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
