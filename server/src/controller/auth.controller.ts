import { CookieOptions, NextFunction, Request, Response } from "express";
import { API_URL, JWT_ACCESS_TTL, JWT_REFRESH_TTL, NODE_ENV } from "../../config";
import { CreateUserInput, LoginUserInput, VerifyEmailInput } from "../schema/user.schema";
import userService from "../service/user.service";
import mailService from "../service/mail.service";
import tokenService from "../service/token.service";
import ApiError from "../exceptions/api.error";
import crypto from "crypto";
import favoriteService from "../service/favorite.service";

const accessTokenCookieOptions: CookieOptions = {
    maxAge: JWT_ACCESS_TTL,
    httpOnly: true,
    sameSite: "lax",
};

const refreshTokenCookieOptions: CookieOptions = {
    maxAge: JWT_REFRESH_TTL,
    httpOnly: true,
    sameSite: "lax",
};

if (NODE_ENV === "production") accessTokenCookieOptions.secure = true;

class AuthController {
    async register(req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) {
        try {
            const user = await userService.createUser(req.body);
            const verificationCode = user.createVerificationCode();
            await user.save({ validateBeforeSave: false });

            const tokens = await tokenService.signTokens(user, res.locals.ua);
            this.addAuthCookies(res, tokens);

            const activationUrl = `${API_URL}/api/activate/${verificationCode}`;
            await mailService.sendVerification(user, activationUrl);
            await favoriteService.createFavoriteUser(user._id);

            return res.status(201).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await userService.findUserWithPassword({ email });

            if (!user || !user.comparePassword(password)) {
                throw ApiError.BadRequest("Неверный адрес электронной почты или пароль");
            }

            const tokens = await tokenService.signTokens(user, res.locals.ua);
            this.addAuthCookies(res, tokens);

            return res.status(201).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const message = "Невозможно обновить access token";
            const refreshToken = req.cookies["refresh_token"];

            const decoded = tokenService.verifyJwt<{ id: string }>(refreshToken, "refresh");
            if (!decoded) throw new ApiError(message, 403);

            const token = await tokenService.findToken(refreshToken, res.locals.ua);
            if (!token) throw new ApiError(message, 403);

            const user = await userService.findUser({ id: decoded.id });
            if (!user) throw new ApiError(message, 403);

            const tokens = await tokenService.signTokens(user, res.locals.ua);
            this.addAuthCookies(res, tokens);

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies["refresh_token"];
            await tokenService.deleteToken(refreshToken, res.locals.ua);
            this.removeAuthCookies(res);
            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async verifyEmail(req: Request<VerifyEmailInput>, res: Response, next: NextFunction) {
        try {
            const verificationCode = crypto
                .createHash("sha256")
                .update(req.params.verificationCode)
                .digest("hex");

            const user = await userService.findUser({ verificationCode });
            if (!user) {
                throw ApiError.BadRequest("Невозможно верифицировать адрес электронной почты");
            }

            user.verificationCode = null;
            user.verified = true;
            await user.save({ validateBeforeSave: false });

            return res
                .status(200)
                .json({
                    message: "Электронная почта успешно подтверждена",
                })
                .redirect(API_URL);
        } catch (e) {
            next(e);
        }
    }

    private addAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
        res.cookie("access_token", tokens.accessToken, accessTokenCookieOptions);
        res.cookie("refresh_token", tokens.refreshToken, refreshTokenCookieOptions);
        res.cookie("logged", true, { ...refreshTokenCookieOptions, httpOnly: false });
    }

    private removeAuthCookies(res: Response) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.clearCookie("logged");
    }
}

export const tokenExcludeFields = ["password"];
export default new AuthController();