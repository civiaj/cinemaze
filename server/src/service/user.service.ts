import { FilterQuery, QueryOptions, Types } from "mongoose";
import userModel, { User } from "../model/user.model";
import ApiError from "../exceptions/api.error";

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

    async getAll() {
        return userModel.find().lean();
    }
}

export default new UserService();
