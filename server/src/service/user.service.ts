import { FilterQuery, ProjectionType, QueryOptions, Types, UpdateQuery } from "mongoose";
import userModel, { User } from "../model/user.model";
import ApiError from "../exceptions/api.error";
import { GetAllUsersInput } from "../schema/manage.schema";
import { Locale, Order, Providers, Roles } from "../types/types";

type GetAllUsersProps = {
    pageNumber: number;
    sortField: GetAllUsersInput["filter"];
    orderQuery: Order;
    locale: Locale;
    searchQuery?: string;
    role: Roles;
};

class UserService {
    async createUser(newUser: Partial<User>, provider: Providers = "local") {
        const candidate = await userModel.findOne({ email: newUser.email, provider });
        if (candidate)
            throw ApiError.BadRequest("Пользователь с таким почтовым адресом существует.");
        return userModel.create(newUser);
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

const hideEmail = (email: string) => {
    return email.slice(0, 2) + "*".repeat(10) + email.slice(-1);
};

export default new UserService();
