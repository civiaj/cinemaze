import { NextFunction, Request, Response } from "express";
import { STATIC_PROFILE_DEFAULT } from "../config";
import ApiError from "../exceptions/api.error";
import {
    GetAllUsersInput,
    GetOneUserInput,
    ManageUserBanInput,
    ManageUserChangeInput,
    ManageUserUnbanInput,
} from "../schema/manage.schema";
import userService from "../service/user.service";
import { Order } from "../types/types";

class ManageController {
    async getOne(req: Request<GetOneUserInput>, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const user = await userService.findUser({ id: userId });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            return res.status(200).json({ data: user });
        } catch (e) {
            next(e);
        }
    }
    async getAll(
        req: Request<object, object, object, GetAllUsersInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { page, filter, order, query, locale } = req.query;
            const data = await userService.getAll({
                locale,
                orderQuery: Number(order) as Order,
                pageNumber: Number(page),
                role: res.locals.user.role,
                sortField: filter,
                searchQuery: query,
            });
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async updateOne(
        req: Request<object, object, ManageUserChangeInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { deletePhoto, displayName, manageUserId, role } = req.body;

            const user = await userService.findUser({ id: manageUserId });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            user.displayName = displayName;
            user.role = role;
            if (deletePhoto && user.photo !== STATIC_PROFILE_DEFAULT) {
                user.photo = STATIC_PROFILE_DEFAULT;
            }
            await user.save();

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async banOne(
        req: Request<object, object, ManageUserBanInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { banExpiration, banMessage, manageUserId } = req.body;

            const user = await userService.findUser({ id: manageUserId });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            user.isBanned = true;
            user.banMessage = banMessage;
            user.banExpiration = new Date(banExpiration);
            await user.save();

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async unbanOne(req: Request<ManageUserUnbanInput>, res: Response, next: NextFunction) {
        try {
            const { manageUserId } = req.params;

            const user = await userService.findUser({ id: manageUserId });
            if (!user) throw ApiError.BadRequest("Нет пользователя с таким id");

            user.isBanned = false;
            user.banMessage = null;
            user.banExpiration = null;

            await user.save();

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }
}

export default new ManageController();
