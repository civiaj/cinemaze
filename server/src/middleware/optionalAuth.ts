import { NextFunction, Request, Response } from "express";
import tokenService from "../service/token.service";
import userService from "../service/user.service";
import ApiError from "../exceptions/api.error";

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

        if (accessToken && refreshToken) {
            const decoded = tokenService.verifyJwt<{ id: string }>(accessToken, "access");
            if (decoded) {
                const user = await userService.findUser({ id: decoded.id }, {}, { lean: true });
                if (user) {
                    const token = await tokenService.findToken({
                        user: user.id,
                        userAgent: res.locals.userAgent,
                    });
                    if (token) {
                        res.locals.user = user;
                        return next();
                    }
                }
            }
        } else if (refreshToken) {
            throw ApiError.Unauthorized();
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
};
