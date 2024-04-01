import { Navigate } from "react-router-dom";
import { DetailsPage } from "pages/DetailsPage";
import { FavoritePage } from "pages/FavoritePage";
import { LoginPage } from "pages/LoginPage";
import { MainPage } from "pages/MainPage/";
import { SearchPage } from "pages/SearchPage";
import { ManagePage } from "pages/ManagePage";
import { StatisticsPage } from "pages/StatisticsPage";
import { UserPage } from "pages/UserPage";
import { EmailVerificationPage } from "pages/EmailVerificationPage";

import { IRoute } from "./types";
import { BanPage } from "pages/BanPage";

export enum AppRoutes {
    MAIN = "main",
    DETAILS = "details",
    SEARCH = "search",
    DEFAULT = "default",
    FAVORITE = "favorite",
    LOGIN = "login",
    STATISTICS = "statistics",
    USER = "user",
    RESETPASSWORD = "resetpassword",
    EMAILVERIFICATION = "emailverificaiton",
    MANAGE_USERS = "manage",
    BAN = "ban",
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.DEFAULT]: "*",
    [AppRoutes.MAIN]: "/films",
    [AppRoutes.DETAILS]: "/films",
    [AppRoutes.SEARCH]: "/search",
    [AppRoutes.FAVORITE]: "/favorite",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.STATISTICS]: "/statistics",
    [AppRoutes.USER]: "/me",
    [AppRoutes.RESETPASSWORD]: "/login",
    [AppRoutes.EMAILVERIFICATION]: "/emailverificaiton",
    [AppRoutes.MANAGE_USERS]: "/manage",
    [AppRoutes.BAN]: "/ban",
};

export const routeConfig: Record<AppRoutes, IRoute> = {
    [AppRoutes.DEFAULT]: {
        element: <Navigate to={routePath.main} replace />,
        path: routePath.default,
        label: "",
        auth: false,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.MAIN]: {
        element: <MainPage />,
        path: routePath.main,
        label: "r-main",
        auth: false,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.DETAILS]: {
        element: <DetailsPage />,
        path: routePath.details + "/:id",
        label: "",
        auth: false,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.SEARCH]: {
        element: <SearchPage />,
        path: routePath.search,
        label: "r-search",
        auth: false,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.LOGIN]: {
        element: <LoginPage />,
        path: routePath.login,
        label: "r-login",
        auth: false,
        allowedRoles: ["user", "admin"],
    },
    [AppRoutes.RESETPASSWORD]: {
        element: <LoginPage />,
        path: routePath.login,
        label: "r-login",
        auth: false,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.FAVORITE]: {
        element: <FavoritePage />,
        path: routePath.favorite,
        label: "r-favorite",
        auth: true,
        allowedRoles: ["user", "admin"],
    },
    [AppRoutes.STATISTICS]: {
        element: <StatisticsPage />,
        path: routePath.statistics,
        label: "r-statistics",
        auth: true,
        allowedRoles: ["user", "admin"],
    },
    [AppRoutes.USER]: {
        element: <UserPage />,
        path: routePath.user,
        label: "r-user",
        auth: true,
        allowedRoles: ["user", "admin"],
    },

    [AppRoutes.EMAILVERIFICATION]: {
        element: <EmailVerificationPage />,
        path: routePath.emailverificaiton,
        label: "",
        auth: false,
        allowedRoles: [],
    },
    [AppRoutes.MANAGE_USERS]: {
        element: <ManagePage />,
        path: routePath.manage,
        label: "r-manage",
        auth: true,
        allowedRoles: ["admin"],
    },
    [AppRoutes.BAN]: {
        element: <BanPage />,
        path: routePath.ban,
        label: "r-ban",
        auth: true,
        allowedRoles: ["user", "admin"],
    },
};
