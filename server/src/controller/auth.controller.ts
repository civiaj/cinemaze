import crypto from "crypto";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { ADMINS, API_URL, CLIENT_URL, JWT_ACCESS_TTL, JWT_REFRESH_TTL, NODE_ENV } from "../config";
import ApiError from "../exceptions/api.error";
import { GoogleOAuthInput } from "../schema/oauth.schema";
import {
    CheckPasswordInput,
    CreateUserInput,
    EmailInput,
    LoginUserInput,
    ResetPasswordInput,
    VerifyEmailInput,
} from "../schema/user.schema";
import favoriteService from "../service/favorite.service";
import googleService from "../service/google.service";
import mailService from "../service/mail.service";
import tokenService from "../service/token.service";
import userService from "../service/user.service";

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

            if (ADMINS.includes(req.body.email)) user.role = "admin";

            await user.save({ validateBeforeSave: false });

            const tokens = await tokenService.signTokens(user.id, res.locals.ua);
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
            const user = await userService.findUser(
                { email, provider: "local" },
                { password: 1, id: 1 }
            );

            if (!user || !user.comparePassword(password)) {
                throw ApiError.BadRequest("Неверный адрес электронной почты или пароль");
            }

            const tokens = await tokenService.signTokens(user.id, res.locals.ua);
            this.addAuthCookies(res, tokens);

            return res.status(200).json({ message: "success" });
        } catch (e) {
            next(e);
        }
    }

    async checkPassword(
        req: Request<{}, {}, CheckPasswordInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { password } = req.body;
            const { id, provider } = res.locals.user;
            const user = await userService.findUser({ id, provider }, { password: 1 });

            if (!user || !user.comparePassword(password)) {
                throw ApiError.BadRequest("Неверный пароль");
            }

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

            const token = await tokenService.findToken({ refreshToken, userAgent: res.locals.ua });

            if (!token) throw new ApiError(message, 403);

            const user = await userService.findUser({ id: decoded.id });
            if (!user) throw new ApiError(message, 403);

            const tokens = await tokenService.signTokens(user.id, res.locals.ua);
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

            const redirectUrl = CLIENT_URL + "/emailverificaiton?status=";

            const user = await userService.findUser({ verificationCode });
            if (!user) {
                return res.redirect(redirectUrl + "error");
            }

            user.verificationCode = null;
            user.verified = true;
            await user.save({ validateBeforeSave: false });

            return res.redirect(redirectUrl + "success");
        } catch (e) {
            next(e);
        }
    }

    async forgotPassword(req: Request<{}, {}, EmailInput>, res: Response, next: NextFunction) {
        try {
            const user = await userService.findUser({ email: req.body.email, provider: "local" });
            if (!user) throw ApiError.BadRequest("Неверный адрес электронной почты.");
            if (!user.verified)
                throw ApiError.BadRequest("Электронный адрес почты не подтвержден.");

            const resetToken = user.createResetToken();
            await user.save({ validateBeforeSave: false });

            const resetPasswordPath = "/login?section=reset&t=";
            const url = `${CLIENT_URL}${resetPasswordPath}${resetToken}`;

            try {
                await mailService.sendPasswordReset(user, url);
                return res.json({
                    message: "Ссылка для изменения пароля была отправлена на вашу почту.",
                });
            } catch (e) {
                user.passwordResetToken = null;
                user.passwordResetAt = null;
                await user.save();
                throw ApiError.MailError();
            }
        } catch (e) {
            next(e);
        }
    }

    async resetPassword(
        req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const resetToken = crypto
                .createHash("sha256")
                .update(req.params.resetToken)
                .digest("hex");

            const user = await userService.findUser({
                passwordResetToken: resetToken,
                passwordResetAt: { $gt: new Date() },
            });

            if (!user)
                throw ApiError.BadRequest("Токен недействителен или срок его действия истек.");

            user.password = req.body.password;
            user.passwordResetToken = null;
            user.passwordResetAt = null;
            await user.save();

            res.status(200).json({
                message:
                    "Данные пароля успешно обновлены. Пожалуйста, войдите в систему, используя новые учетные данные.",
            });
        } catch (e) {
            next(e);
        }
    }

    async googleOAuthHandler(
        req: Request<{}, {}, {}, GoogleOAuthInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { code } = req.query;

            const { access_token, id_token } = await googleService.getTokens(code);
            const googleUser = await googleService.getUser({ access_token, id_token });
            const { email, verified_email, name, picture } = googleUser;

            if (!verified_email)
                throw ApiError.BadRequest("Электронный адрес почты google не подтвержден.");

            let user = await userService.findUser({ email, provider: "google" });

            if (!user) {
                const role = ADMINS.includes(email) ? "admin" : "admin-test";
                user = await userService.createUser(
                    {
                        email,
                        photo: picture,
                        provider: "google",
                        displayName: name,
                        verified: true,
                        role,
                    },
                    "google"
                );
            }

            const tokens = await tokenService.signTokens(user.id, res.locals.ua);
            this.addAuthCookies(res, tokens);

            return res.redirect(CLIENT_URL + "/main");
        } catch (e) {
            let url = "";
            if (e instanceof Error) {
                url = "?error=" + e.message;
            }
            return res.redirect(CLIENT_URL + "/login" + url);
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
