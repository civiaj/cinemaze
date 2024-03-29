import { FilterQuery, QueryOptions, Types } from "mongoose";
import userModel, { User } from "../model/user.model";
import ApiError from "../exceptions/api.error";
import { GetAllUsersInput } from "../schema/manage.schema";
import { Locale, Order } from "../types/types";

class UserService {
    async createUser(input: Partial<User>) {
        const candidate = await userModel.findOne({ email: input.email });
        if (candidate)
            throw ApiError.BadRequest("Пользователь с таким почтовым адресом существует.");
        return userModel.create(input);
    }

    async deleteUser(email: string) {
        return userModel.deleteOne({ email }).lean();
    }

    async findUser(filter: FilterQuery<User>, options: QueryOptions = {}) {
        return userModel.findOne(filter, {}, options).select("+photo");
    }

    async findUserWithPassword(filter: FilterQuery<User>, options: QueryOptions = {}) {
        return userModel.findOne(filter, {}, options).select("+password");
    }

    async getAll(
        pageNumber: number,
        sortField: GetAllUsersInput["filter"],
        orderQuery: Order,
        locale: Locale,
        searchQuery?: string
    ) {
        const limit = 20;
        const skip = (pageNumber - 1) * limit;

        let filter: FilterQuery<User> = {};
        let order = orderQuery;
        let sort = sortField;
        let sortIfEqual = {};

        if (searchQuery) {
            filter = { displayName: { $regex: new RegExp(searchQuery, "i") } };
            order = 1;
            sort = "displayName";
        }

        if (sort === "createdAt" || sort === "verified" || sort === "isBanned") {
            order = order === 1 ? -1 : 1;
        }

        if (sort !== "displayName") {
            sortIfEqual = { displayName: 1 };
        }

        const users = await userModel
            .find(
                filter,
                {},
                {
                    collation: { locale, caseLevel: false },
                    sort: { [sort]: order, ...sortIfEqual },
                    skip,
                    limit,
                }
            )
            .lean();

        const total = await userModel.countDocuments(filter);

        return { users, totalPages: Math.ceil(total / limit) };
    }
}

export default new UserService();
