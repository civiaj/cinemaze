import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import tokenService from "../service/token.service";
import userService from "../service/user.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let accessToken: string | undefined;
        let refreshToken: string | undefined;

        const inHeaders =
            req.get("Authorization") && req.get("Authorization")?.startsWith("Bearer");

        if (inHeaders) {
            accessToken = req.get("Authorization")?.split(" ")[1];
        } else if (req.cookies["access_token"]) {
            accessToken = req.cookies["access_token"];
        }

        if (req.cookies["refresh_token"]) {
            refreshToken = req.cookies["refresh_token"];
        }

        if (!accessToken || !req.cookies["logged"] || !refreshToken) throw ApiError.Unauthorized();

        const decoded = tokenService.verifyJwt<{ id: string }>(accessToken, "access");

        if (!decoded) throw ApiError.Unauthorized("Неверный токен");

        const user = await userService.findUser({ id: decoded.id }, {}, { lean: true });
        if (!user) throw ApiError.Unauthorized("Пользователь с указанным токеном не существует");

        const token = await tokenService.findToken({
            user: user.id,
            userAgent: res.locals.userAgent,
        });
        if (!token) throw ApiError.Unauthorized("Токен недействителен");

        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
