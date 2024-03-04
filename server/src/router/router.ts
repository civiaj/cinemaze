import { Router } from "express";
import validate from "../middleware/validate";
import {
    createUserSchema,
    displayNameSchema,
    emailSchema,
    loginUserSchema,
    passwordSchema,
    removeSessionSchema,
    resetPasswordSchema,
    verifyEmailSchema,
} from "../schema/user.schema";
import authController from "../controller/auth.controller";
import deserializeUser from "../middleware/deserializeUser";
import userController from "../controller/user.controller";
import roles from "../middleware/roles";
import {
    getFavoriteAllSchema,
    getFavoriteOneSchema,
    removeFavoriteOneSchema,
} from "../schema/favorite.schema";
import favoriteController from "../controller/favorite.controller";
import { createFilmSchema } from "../schema/film.schema";
import { resizeSingleImage, uploadSingleImage } from "../upload/single.image";

const router = Router();

// Авторизация
router.post("/register", validate(createUserSchema), authController.register.bind(authController));
router.post("/login", validate(loginUserSchema), authController.login.bind(authController));
router.post("/checkPassword", validate(loginUserSchema), authController.checkPassword);
router.get("/refresh", authController.refresh.bind(authController));
router.get("/logout", deserializeUser, authController.logout.bind(authController));
router.get("/activate/:verificationCode", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/forgot", validate(emailSchema), authController.forgotPassword);
router.post("/reset/:resetToken", validate(resetPasswordSchema), authController.resetPassword);
//?? Добавить 2 эндпоинта: a) для сброса пороля б) для верификации сброса.

// Пользователь
router.get("/user/me", deserializeUser, userController.getMe);
router.get("/user/all", deserializeUser, roles(["admin"]), userController.getAll);
router.get("/user/sessions", deserializeUser, userController.getUserSessions);
router.patch(
    "/user/update/displayName",
    deserializeUser,
    validate(displayNameSchema),
    userController.updateUserDisplayName
);
router.patch(
    "/user/update/password",
    deserializeUser,
    validate(passwordSchema),
    userController.updatePassword
);
router.patch(
    "/user/update/photo",
    deserializeUser,
    uploadSingleImage,
    resizeSingleImage,
    userController.updateUserPhoto
);
router.patch("/user/remove/photo", deserializeUser, userController.deleteUserPhoto);

router.delete(
    "/user/sessions",
    deserializeUser,
    validate(removeSessionSchema),
    userController.removeSession
);

// Получить фильмы
router.get(
    "/favorite",
    deserializeUser,
    validate(getFavoriteAllSchema),
    favoriteController.getAllFavorite
);
router.get(
    "/favorite/info/:filmId",
    deserializeUser,
    validate(getFavoriteOneSchema),
    favoriteController.getOneFavorite
);
router.post(
    "/favorite/add",
    deserializeUser,
    validate(createFilmSchema),
    favoriteController.addFavorite
);

router.get("/favorite/sync", deserializeUser, favoriteController.syncApis);

router.post(
    "/favorite/remove",
    deserializeUser,
    validate(removeFavoriteOneSchema),
    favoriteController.removeFavorite
);

router.get("/favorite/statistics", deserializeUser, favoriteController.getStatistics);

export default router;
