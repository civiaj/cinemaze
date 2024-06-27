import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { STATIC_PROFILE_DEFAULT, STATIC_PROFILE_NEW, STATIC_PROFILE_PATH } from "../config";
import ApiError from "../exceptions/api.error";
import {
    DisplayNameInput,
    RemoveSessionInput,
    UpdatePasswordInput,
    UpdateRolesInput,
} from "../schema/user.schema";
import tokenService from "../service/token.service";
import userService from "../service/user.service";
import logger from "../utils/logger";

class UserController {
    async getMe(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            return res.status(200).json({ data: user });
        } catch (e) {
            next(e);
        }
    }

    async updateUserDisplayName(
        req: Request<object, object, DisplayNameInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await userService.findUser({ id: res.locals.user.id });

            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");
            user.displayName = req.body.displayName;
            await user.save({ validateBeforeSave: false });

            return res.status(200).json({ data: "success" });
        } catch (e) {
            next(e);
        }
    }

    async updatePassword(
        req: Request<object, object, UpdatePasswordInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await userService.findUser(
                { id: res.locals.user.id, provider: res.locals.user.provider },
                { password: 1 }
            );

            const { password } = req.body;

            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            if (user.comparePassword(password))
                throw ApiError.BadRequest("Новый пароль должен отличаться от старого.");

            user.password = password;

            await user.save();

            return res.status(200).json({ data: "success" });
        } catch (e) {
            next(e);
        }
    }

    async updateUserPhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findUser({ id: res.locals.user.id });

            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            if (user.photo && user.photo !== STATIC_PROFILE_DEFAULT) {
                try {
                    fs.unlinkSync(path.join(__dirname, `../..${STATIC_PROFILE_PATH}`, user.photo));
                } catch (e) {
                    // do something
                }
            }
            user.photo = STATIC_PROFILE_NEW + req.body.newPhoto;
            await user.save({ validateBeforeSave: false });

            return res.status(200).json({ data: "success" });
        } catch (e) {
            next(e);
        }
    }

    async deleteUserPhoto(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findUser({
                id: res.locals.user.id,
                provider: res.locals.user.provider,
            });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            if (user.photo && user.photo !== STATIC_PROFILE_DEFAULT) {
                try {
                    const photoName = user.photo.split("/")[user.photo.split("/").length - 1];

                    fs.unlinkSync(path.join(__dirname, `../..${STATIC_PROFILE_PATH}`, photoName));
                    user.photo = STATIC_PROFILE_DEFAULT;
                    await user.save({ validateBeforeSave: false });
                } catch (e) {
                    logger.error(e);
                }
            }

            return res.status(200).json({ data: "success" });
        } catch (e) {
            next(e);
        }
    }

    async getUserSessions(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tokenService.getUserSessions(
                res.locals.user.id,
                res.locals.userAgent
            );
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async removeSession(
        req: Request<object, object, RemoveSessionInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await tokenService.removeUserSessions(
                res.locals.user.id,
                res.locals.userAgent,
                req.body.session
            );
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async updateRole(
        req: Request<object, object, UpdateRolesInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await userService.findUser({ id: res.locals.user.id });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            const { role } = req.body;
            if (role === "admin") throw ApiError.NotAllowed();

            user.role = role;
            user.save();

            return res.json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
