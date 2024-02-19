import { Types } from "mongoose";
import {
    JWT_ACCESS_PRIVATE_KEY,
    JWT_REFRESH_PRIVATE_KEY,
    JWT_ACCESS_PUBLIC_KEY,
    JWT_REFRESH_PUBLIC_KEY,
    JWT_ACCESS_TTL,
    JWT_REFRESH_TTL,
} from "../../config";
import tokenModel from "../model/token.model";
import { User } from "../model/user.model";
import jwt from "jsonwebtoken";

type Keys = "access" | "refresh";

const privateKeys: Record<Keys, string> = {
    access: JWT_ACCESS_PRIVATE_KEY,
    refresh: JWT_REFRESH_PRIVATE_KEY,
};

const publicKeys: Record<Keys, string> = {
    access: JWT_ACCESS_PUBLIC_KEY,
    refresh: JWT_REFRESH_PUBLIC_KEY,
};

class TokenService {
    private signJwt(payload: Object, privateKey: Keys, options?: jwt.SignOptions) {
        return jwt.sign(payload, privateKeys[privateKey], { algorithm: "RS256", ...options });
    }

    verifyJwt<T>(token: string, publicKey: Keys): T | null {
        try {
            return jwt.verify(token, publicKeys[publicKey]) as T;
        } catch (e) {
            return null;
        }
    }

    private async saveToken(id: Types.ObjectId | string, refreshToken: string, userAgent: string) {
        const tokenDocument = await tokenModel.findOne({ user: id, userAgent });
        if (tokenDocument) {
            tokenDocument.refreshToken = refreshToken;
            return tokenDocument.save();
        }
        return tokenModel.create({ user: id, refreshToken, userAgent });
    }

    async signTokens(user: User, userAgent: string) {
        const accessToken = this.signJwt({ id: user.id }, "access", {
            expiresIn: JWT_ACCESS_TTL,
        });
        const refreshToken = this.signJwt({ id: user.id }, "refresh", {
            expiresIn: JWT_REFRESH_TTL,
        });

        await this.saveToken(user.id, refreshToken, userAgent);

        return { accessToken, refreshToken };
    }

    async findToken(refreshToken: string, userAgent: string) {
        return tokenModel.findOne({ refreshToken, userAgent }, {}, { lean: true });
    }

    async deleteToken(refreshToken: string, userAgent: string) {
        return tokenModel.deleteOne({ refreshToken, userAgent });
    }
}

export default new TokenService();
