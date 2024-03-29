import { NextFunction, Response, Request } from "express";
import userService from "../service/user.service";
import tokenService from "../service/token.service";
import ApiError from "../exceptions/api.error";
import { DisplayNameInput, RemoveSessionInput, UpdatePasswordInput } from "../schema/user.schema";
import fs from "fs";
import path from "path";
import userModel, { User } from "../model/user.model";
import { DEFAULT_USER_PHOTO } from "../../config";

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
            const user = await userService.findUserWithPassword({ id: res.locals.user.id });
            const newPassword = req.body.password;

            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            // throw error if same password was provided
            if (user.comparePassword(newPassword))
                throw ApiError.BadRequest("Новый пароль должен отличаться от старого.");

            user.password = newPassword;

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

            if (user.photo && user.photo !== DEFAULT_USER_PHOTO) {
                try {
                    fs.unlinkSync(path.join(__dirname, "../../static/profiles", user.photo));
                } catch (e) {}
            }
            user.photo = req.body.photo;
            await user.save({ validateBeforeSave: false });

            return res.status(200).json({ data: "success" });
        } catch (e) {
            next(e);
        }
    }

    async deleteUserPhoto(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findUser({ id: res.locals.user.id });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            if (user.photo && user.photo !== DEFAULT_USER_PHOTO) {
                try {
                    fs.unlinkSync(path.join(__dirname, "../../static/profiles", user.photo));
                    user.photo = DEFAULT_USER_PHOTO;
                    await user.save({ validateBeforeSave: false });
                } catch (e) {}
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

    // async deleteManyUsers(req: Request, res: Response, next: NextFunction) {
    //     const p = "testemail";
    //     await userModel.deleteMany({ email: { $regex: p } });

    //     return res.status(200);
    // }

    async addUsersOfNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const number = req.body.number;
            const users: Pick<User, "email" | "displayName" | "password" | "id">[] = [];

            for (let i = 0; i < number; i++) {
                const newUser: Pick<User, "email" | "displayName" | "password" | "id"> = {
                    email: `testemail${i}@mail.com`,
                    displayName: `Name ${i}`,
                    password: `123${i}`,
                    id: String(Math.random() + i),
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
