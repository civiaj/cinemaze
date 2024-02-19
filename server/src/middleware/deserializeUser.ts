import { NextFunction, Response, Request } from "express";
import ApiError from "../exceptions/api.error";
import tokenService from "../service/token.service";
import userService from "../service/user.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let accessToken: string | undefined;

        if (req.get("Authorization") && req.get("Authorization")?.startsWith("Bearer")) {
            accessToken = req.get("Authorization")?.split(" ")[1];
        } else if (req.cookies["access_token"]) accessToken = req.cookies["access_token"];

        if (!accessToken || !req.cookies["logged"]) throw ApiError.Unauthorized();

        const decoded = tokenService.verifyJwt<{ id: string }>(accessToken, "access");

        if (!decoded) throw ApiError.Unauthorized("Неверный токен");

        const user = await userService.findUser({ id: decoded.id });
        if (!user) throw ApiError.Unauthorized("Пользователь с указанным токеном не существует");

        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
