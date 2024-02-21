import { Router } from "express";
import validate from "../middleware/validate";
import { createUserSchema, loginUserSchema, verifyEmailSchema } from "../schema/user.schema";
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

const router = Router();

// Авторизация
router.post("/register", validate(createUserSchema), authController.register.bind(authController));
router.post("/login", validate(loginUserSchema), authController.login.bind(authController));
router.get("/refresh", authController.refresh.bind(authController));
router.get("/logout", deserializeUser, authController.logout.bind(authController));
router.get("/activate/:verificationCode", validate(verifyEmailSchema), authController.verifyEmail);
//?? Добавить 2 эндпоинта: a) для сброса пороля б) для верификации сброса пороля через email.

// Получить пользователя
router.get("/users/me", deserializeUser, userController.getMe);
router.get("/users/all", deserializeUser, roles(["admin"]), userController.getAll);
router.get("/user/sessions", deserializeUser, userController.getUserSessions);

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
