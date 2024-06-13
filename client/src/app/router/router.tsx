import { Navigate } from "react-router-dom";
import { BanPage } from "@/pages/BanPage";
import { DetailsPage } from "@/pages/DetailsPage";
import { EmailVerificationPage } from "@/pages/EmailVerificationPage";
import { FavoritePage } from "@/pages/FavoritePage";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage/";
import { ManagePage } from "@/pages/ManagePage";
import { PrivacyPage } from "@/pages/PrivacyAndTosPage";
import { SearchPage } from "@/pages/SearchPage";
import { StatisticsPage } from "@/pages/StatisticsPage";
import { UserPage } from "@/pages/UserPage";
import { IRoute } from "./types";

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
    PRIVACY = "privacy",
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
    [AppRoutes.PRIVACY]: "/privacy",
};

export const routeConfig: Record<AppRoutes, IRoute> = {
    [AppRoutes.DEFAULT]: {
        element: <Navigate to={routePath.main} replace />,
        path: routePath.default,
        label: "",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },

    [AppRoutes.MAIN]: {
        element: <MainPage />,
        path: routePath.main,
        label: "main-t",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },

    [AppRoutes.DETAILS]: {
        element: <DetailsPage />,
        path: routePath.details + "/:id",
        label: "",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },

    [AppRoutes.SEARCH]: {
        element: <SearchPage />,
        path: routePath.search,
        label: "search-t",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },

    [AppRoutes.LOGIN]: {
        element: <LoginPage />,
        path: routePath.login,
        label: "login-t",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },
    [AppRoutes.RESETPASSWORD]: {
        element: <LoginPage />,
        path: routePath.login,
        label: "login-t",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },

    [AppRoutes.FAVORITE]: {
        element: <FavoritePage />,
        path: routePath.favorite,
        label: "favorite-t",
        auth: true,
        allowedRoles: ["user", "admin", "admin-test"],
    },
    [AppRoutes.STATISTICS]: {
        element: <StatisticsPage />,
        path: routePath.statistics,
        label: "stat-t",
        auth: true,
        allowedRoles: ["user", "admin", "admin-test"],
    },
    [AppRoutes.USER]: {
        element: <UserPage />,
        path: routePath.user,
        label: "user-t",
        auth: true,
        allowedRoles: ["user", "admin", "admin-test"],
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
        label: "manage-t",
        auth: true,
        allowedRoles: ["admin", "admin-test"],
    },
    [AppRoutes.BAN]: {
        element: <BanPage />,
        path: routePath.ban,
        label: "ban-t",
        auth: true,
        allowedRoles: ["user", "admin", "admin-test"],
    },
    [AppRoutes.PRIVACY]: {
        element: <PrivacyPage />,
        path: routePath.privacy,
        label: "privacy-t",
        auth: false,
        allowedRoles: ["user", "admin", "admin-test"],
    },
};
