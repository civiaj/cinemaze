import jwt from "jsonwebtoken";
import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import {
    JWT_ACCESS_PRIVATE_KEY,
    JWT_ACCESS_PUBLIC_KEY,
    JWT_ACCESS_TTL,
    JWT_REFRESH_PRIVATE_KEY,
    JWT_REFRESH_PUBLIC_KEY,
    JWT_REFRESH_TTL,
} from "../config";
import ApiError from "../exceptions/api.error";
import tokenModel, { Token } from "../model/token.model";
import { User } from "../model/user.model";

type Keys = "access" | "refresh";
type TokenPayload = { id: User["id"]; refreshToken: string; userAgent: string };

const privateKeys: Record<Keys, string> = {
    access: JWT_ACCESS_PRIVATE_KEY,
    refresh: JWT_REFRESH_PRIVATE_KEY,
};

const publicKeys: Record<Keys, string> = {
    access: JWT_ACCESS_PUBLIC_KEY,
    refresh: JWT_REFRESH_PUBLIC_KEY,
};

class TokenService {
    private signJwt(payload: Record<string, unknown>, privateKey: Keys, options?: jwt.SignOptions) {
        return jwt.sign(payload, privateKeys[privateKey], { algorithm: "RS256", ...options });
    }

    verifyJwt<T>(token: string, publicKey: Keys): T | null {
        try {
            return jwt.verify(token, publicKeys[publicKey]) as T;
        } catch (e) {
            return null;
        }
    }

    async saveToken(tokenPayload: TokenPayload, options: QueryOptions = {}) {
        const { id, refreshToken, userAgent } = tokenPayload;
        const tokenDocument = await tokenModel.findOne({ user: id, userAgent });
        if (tokenDocument) {
            tokenDocument.refreshToken = refreshToken;
            return tokenDocument.save();
        }
        return (await tokenModel.create([{ user: id, refreshToken, userAgent }], options))[0];
    }

    async signTokens(tokenPayload: Omit<TokenPayload, "refreshToken">, options: QueryOptions = {}) {
        const { id, userAgent } = tokenPayload;
        const accessToken = this.signJwt({ id }, "access", {
            expiresIn: JWT_ACCESS_TTL,
        });
        const refreshToken = this.signJwt({ id }, "refresh", {
            expiresIn: JWT_REFRESH_TTL,
        });

        await this.saveToken({ id, refreshToken, userAgent }, options);
        return { accessToken, refreshToken };
    }

    async findToken(filter: FilterQuery<Token>) {
        return tokenModel.findOne(filter, {}, { lean: true });
    }

    async deleteToken(refreshToken: string, userAgent: string) {
        return tokenModel.deleteOne({ refreshToken, userAgent });
    }

    async getUserSessions(userId: number, userAgent: string) {
        const result = await tokenModel.find({ user: userId }, { userAgent: 1, _id: 0 }).lean();

        const index = result.findIndex((e) => e.userAgent === userAgent);
        const current = result[index];
        result.splice(index, 1);

        return {
            current: JSON.parse(current.userAgent),
            other: result.map((s) => JSON.parse(s.userAgent)),
        };
    }

    async removeUserSessions(userId: number, userAgent: string, session: string) {
        let result;
        if (session === "all") {
            result = await tokenModel.deleteMany({ user: userId, userAgent: { $ne: userAgent } });
        } else {
            result = await tokenModel.deleteOne({ user: userId, userAgent: session });
        }

        if (result.deletedCount === 0) throw ApiError.BadRequest("Сессия не была найдена");

        return result;
    }

    async removeAllSessions(userId: number, session: mongoose.mongo.ClientSession) {
        return tokenModel.deleteMany({ user: userId }, { session });
    }
}

export default new TokenService();
