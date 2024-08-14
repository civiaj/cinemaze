import { Router } from "express";
import authController from "../controller/auth.controller";
import favoriteController from "../controller/favorite.controller";
import manageController from "../controller/manage.controller";
import userController from "../controller/user.controller";
import requireAuth from "../middleware/requireAuth";
import detectBan from "../middleware/detectBan";
import roles from "../middleware/roles";
import validate from "../middleware/validate";
import {getFavoriteAllSchema,removeFavoriteOneSchema} from "../schema/favorite.schema";
import { createFilmSchema } from "../schema/film.schema";
import {getAllUsersSchema,getOneUserSchema,manageUserChangeSchema,mangeUserBanSchema,mangeUserUnbanSchema} from "../schema/manage.schema";
import {checkPasswordSchema,createUserSchema,emailSchema,loginUserSchema,removeSessionSchema,resetPasswordSchema,setDisplayNameSchema,setPasswordSchema,updateRoleSchema,verifyEmailSchema} from "../schema/user.schema";
import { resizeSingleImage, uploadSingleImage } from "../upload/single.image";
import { getExternalDataByIdSchema, getImagesSchema, getReviewsSchema,  getSearchResultsSchema,  getTopSchema } from "../schema/external-films.schema";
import externalFilmsController from "../controller/external-films.controller";
import optionalAuth from "../middleware/optionalAuth";

const router = Router();

// External films
router.get('/films/top', optionalAuth, validate(getTopSchema), externalFilmsController.getTop);
router.get('/films/details/:id', optionalAuth, validate(getExternalDataByIdSchema), externalFilmsController.getDetails);
router.get('/films/images',validate(getImagesSchema),externalFilmsController.getImages);
router.get('/films/reviews', validate(getReviewsSchema), externalFilmsController.getReviews);
router.get('/films/similars/:id', validate(getExternalDataByIdSchema), externalFilmsController.getSimilars);
router.get('/films/awards/:id', validate(getExternalDataByIdSchema), externalFilmsController.getAwards);
router.get('/films/filters', externalFilmsController.getFilters),
router.get('/films/search', validate(getSearchResultsSchema), externalFilmsController.getSearchResults);
// Авторизация
router.post("/register", validate(createUserSchema), authController.register.bind(authController));
router.post("/login", validate(loginUserSchema), authController.login.bind(authController));
router.post( "/checkPassword", requireAuth, validate(checkPasswordSchema), authController.checkPassword);
router.post( "/confirmEmail", requireAuth, validate(emailSchema), authController.confirmEmail);
router.get("/refresh", authController.refresh.bind(authController));
router.get("/logout", requireAuth, authController.logout.bind(authController));
router.get("/activate/:verificationCode", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/forgot", validate(emailSchema), authController.forgotPassword);
router.post("/reset/:resetToken", validate(resetPasswordSchema), authController.resetPassword);
router.delete("/user/delete", requireAuth, authController.accountDelete.bind(authController));
// Пользователь
router.get("/user/me", requireAuth, userController.getMe);
router.get("/user/sessions", requireAuth, userController.getUserSessions);
router.patch( "/user/update/displayName", requireAuth, validate(setDisplayNameSchema), userController.updateUserDisplayName);
router.patch( "/user/update/password", requireAuth, validate(setPasswordSchema), userController.updatePassword);
router.patch( "/user/update/photo", requireAuth, uploadSingleImage, resizeSingleImage, userController.updateUserPhoto);
router.patch( "/user/update/role", requireAuth, validate(updateRoleSchema), userController.updateRole);
router.patch("/user/remove/photo", requireAuth, userController.deleteUserPhoto);
router.delete( "/user/sessions", requireAuth, validate(removeSessionSchema), userController.removeSession
);
// Фэворит
router.get( "/favorite", requireAuth, validate(getFavoriteAllSchema), favoriteController.getAllFavorite);
router.post( "/favorite/add", requireAuth, detectBan, validate(createFilmSchema), favoriteController.addFavorite);
router.post( "/favorite/remove", requireAuth, detectBan, validate(removeFavoriteOneSchema), favoriteController.removeFavorite);
router.get("/favorite/stats", requireAuth, detectBan, favoriteController.getStatistics);
router.get("/favorite/stats/total", requireAuth, favoriteController.getStatisticsTotal);
//manage
router.get(  "/manage/users", requireAuth, detectBan, roles(["admin", "admin-test"]), validate(getAllUsersSchema), manageController.getAll);
router.get( "/manage/users/:userId", requireAuth, detectBan, roles(["admin"]), validate(getOneUserSchema), manageController.getOne);
router.post( "/manage/change", requireAuth, detectBan, roles(["admin"]), validate(manageUserChangeSchema), manageController.updateOne);
router.post( "/manage/ban", requireAuth, detectBan, roles(["admin"]), validate(mangeUserBanSchema), manageController.banOne);
router.get( "/manage/unban/:manageUserId", requireAuth, detectBan, roles(["admin"]), validate(mangeUserUnbanSchema), manageController.unbanOne);
// OAuth
router.get("/oauth/google", authController.googleOAuthHandler.bind(authController));
// TEST
// router.get("/test/remove", testController.remove);
// router.get("/test/add", testController.add);
// router.get('/test/addnumber:number', testController.addNumber)
export default router;
