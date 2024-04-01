import { Router } from "express";
import validate from "../middleware/validate";
import {
    createUserSchema,
    emailSchema,
    loginUserSchema,
    setPasswordSchema,
    removeSessionSchema,
    resetPasswordSchema,
    setDisplayNameSchema,
    verifyEmailSchema,
    updateRoleSchema,
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
import manageController from "../controller/manage.controller";
import {
    getAllUsersSchema,
    getOneUserSchema,
    mangeUserBanSchema,
    mangeUserUnbanSchema,
} from "../schema/manage.schema";
import { manageUserChangeSchema } from "../schema/manage.schema";
import detectBan from "../middleware/detectBan";

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
router.get("/user/sessions", deserializeUser, userController.getUserSessions);
router.patch(
    "/user/update/displayName",
    deserializeUser,
    validate(setDisplayNameSchema),
    userController.updateUserDisplayName
);
router.patch(
    "/user/update/password",
    deserializeUser,
    validate(setPasswordSchema),
    userController.updatePassword
);
router.patch(
    "/user/update/photo",
    deserializeUser,
    uploadSingleImage,
    resizeSingleImage,
    userController.updateUserPhoto
);
router.patch(
    "/user/update/role",
    deserializeUser,
    validate(updateRoleSchema),
    userController.updateRole
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
    detectBan,
    validate(createFilmSchema),
    favoriteController.addFavorite
);

router.get("/favorite/sync", deserializeUser, favoriteController.syncApis);

router.post(
    "/favorite/remove",
    deserializeUser,
    detectBan,
    validate(removeFavoriteOneSchema),
    favoriteController.removeFavorite
);

router.get("/favorite/statistics", deserializeUser, detectBan, favoriteController.getStatistics);

//manage
router.get(
    "/manage/users",
    deserializeUser,
    detectBan,
    roles(["admin", "admin-test"]),
    validate(getAllUsersSchema),
    manageController.getAll
);

router.get(
    "/manage/users/:userId",
    deserializeUser,
    detectBan,
    roles(["admin"]),
    validate(getOneUserSchema),
    manageController.getOne
);

router.post(
    "/manage/change",
    deserializeUser,
    detectBan,
    roles(["admin"]),
    validate(manageUserChangeSchema),
    manageController.updateOne
);

router.post(
    "/manage/ban",
    deserializeUser,
    detectBan,
    roles(["admin"]),
    validate(mangeUserBanSchema),
    manageController.banOne
);

router.get(
    "/manage/unban/:manageUserId",
    deserializeUser,
    detectBan,
    roles(["admin"]),
    validate(mangeUserUnbanSchema),
    manageController.unbanOne
);

// Create and delete num of users for test
// router.delete("/deleteTest", userController.deleteManyUsers);
// router.post("/addUsersOfNumber", userController.addUsersOfNumber);

export default router;
