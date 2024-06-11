import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from "mongoose";
import ApiError from "../exceptions/api.error";
import userModel, { User } from "../model/user.model";
import { GetAllUsersInput } from "../schema/manage.schema";
import { Locale, Order, Roles } from "../types/types";
import { hideEmail } from "../utils/hideEmail";

type GetAllUsersProps = {
    pageNumber: number;
    sortField: GetAllUsersInput["filter"];
    orderQuery: Order;
    locale: Locale;
    searchQuery?: string;
    role: Roles;
};

class UserService {
    async createUser(user: Partial<User>, options: QueryOptions = {}) {
        const { email, provider = "local" } = user;
        const candidate = await userModel.findOne({ email, provider });

        if (candidate)
            throw ApiError.BadRequest("Пользователь с таким почтовым адресом существует.");

        const createdUser = await userModel.create([user], options);
        return createdUser[0];
    }

    async findUser(
        filter: FilterQuery<User>,
        projection: ProjectionType<User> = {},
        options: QueryOptions = {}
    ) {
        return userModel.findOne(filter, projection, options);
    }

    async getAll(getAll: GetAllUsersProps) {
        const { locale, orderQuery, pageNumber, sortField, searchQuery, role } = getAll;

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

        let users = await userModel
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

        if (role === "admin-test") {
            users = users.map((user) => {
                return { ...user, email: hideEmail(user.email) };
            });
        }

        const total = await userModel.countDocuments(filter);

        return { users, totalPages: Math.ceil(total / limit) };
    }

    async checkForExpiredBan() {
        const expiredUsers = await userModel.find(
            {
                banExpiration: { $lte: new Date() },
            },
            {},
            { lean: true }
        );

        const result = await userModel.updateMany(
            { _id: { $in: expiredUsers.map((user) => user._id) } },
            { $set: { isBanned: false, banExpiration: null, banMessage: null } }
        );

        return result.modifiedCount;
    }

    async findAndUpdateUser(
        filter: FilterQuery<User>,
        update: UpdateQuery<User>,
        options: QueryOptions<User> = {}
    ) {
        return userModel.findOneAndUpdate(filter, update, options);
    }
}

export default new UserService();
