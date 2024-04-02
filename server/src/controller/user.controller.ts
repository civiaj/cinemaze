import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { STATIC_PROFILE_DEFAULT, STATIC_PROFILE_NEW, STATIC_PROFILE_PATH } from "../../config";
import ApiError from "../exceptions/api.error";
import userModel, { User } from "../model/user.model";
import {
    DisplayNameInput,
    RemoveSessionInput,
    UpdatePasswordInput,
    UpdateRolesInput,
} from "../schema/user.schema";
import tokenService from "../service/token.service";
import userService from "../service/user.service";

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
        req: Request<{}, {}, DisplayNameInput>,
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
        req: Request<{}, {}, UpdatePasswordInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await userService.findUser(
                { id: res.locals.user.id, provider: res.locals.user.provider },
                { password: 1 }
            );

            const { password } = req.body;

            console.log(user);

            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            // throw error if same password was provided
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
                } catch (e) {}
            }
            user.photo = STATIC_PROFILE_NEW + req.body.photo;
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
                    console.log(e);
                }
            }

            return res.status(200).json({ data: "success" });
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

    async removeSession(
        req: Request<{}, {}, RemoveSessionInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await tokenService.removeUserSessions(
                res.locals.user.id,
                res.locals.ua,
                req.body.session
            );
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async updateRole(req: Request<{}, {}, UpdateRolesInput>, res: Response, next: NextFunction) {
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

    async deleteTestUsers(req: Request, res: Response, next: NextFunction) {
        const data = await userModel.deleteMany({ provider: "test" });
        return res.status(200).json({ data });
    }

    async addTestUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const number = req.body.number ?? 20;
            const users = [];

            for (let i = 0; i < number; i++) {
                const newUser: Pick<
                    User,
                    | "email"
                    | "displayName"
                    | "password"
                    | "id"
                    | "provider"
                    | "verified"
                    | "isBanned"
                > = {
                    email: `testemail${i}@mail.com`,
                    displayName: `Test User №${i}`,
                    password: `123${i}`,
                    id: String(Math.random() + i),
                    provider: "test",
                    isBanned: i % 2 ? true : false,
                    verified: i % 2 ? false : true,
                };
                users[i] = newUser;
            }

            const data = await userModel.insertMany(users);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
