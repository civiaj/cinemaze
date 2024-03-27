import { NextFunction, Request, Response } from "express";
import { GetAllUsersInput } from "../schema/manage.schema";
import userService from "../service/user.service";
import ApiError from "../exceptions/api.error";

class ManageController {
    async getAllUsers(
        req: Request<{}, {}, {}, GetAllUsersInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { page, filter, order, query } = req.query;
            const data = await userService.getAll(
                Number(page),
                filter,
                Number(order) as 1 | -1,
                query
            );
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
}

export default new ManageController();
