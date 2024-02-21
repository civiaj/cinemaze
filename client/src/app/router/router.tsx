import { Navigate } from "react-router-dom";
import { SearchPage } from "pages/SearchPage";
import { MainPage } from "pages/MainPage/";
import { DetailsPage } from "pages/DetailsPage";
import { FavoritePage } from "pages/FavoritePage";
import { LoginPage } from "pages/LoginPage";

import { IRoute } from "./types";
import { StatisticsPage } from "pages/StatisticsPage";
import { UserPage } from "pages/UserPage";

export enum AppRoutes {
    MAIN = "main",
    DETAILS = "details",
    SEARCH = "search",
    DEFAULT = "default",
    FAVORITE = "favorite",
    LOGIN = "login",
    STATISTICS = "statistics",
    USER = "user",
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.DEFAULT]: "/",
    [AppRoutes.MAIN]: "/films",
    [AppRoutes.DETAILS]: "/films",
    [AppRoutes.SEARCH]: "/search",
    [AppRoutes.FAVORITE]: "/favorite",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.STATISTICS]: "/statistics",
    [AppRoutes.USER]: "/me",
};

export const routeConfig: Record<AppRoutes, IRoute> = {
    [AppRoutes.DEFAULT]: {
        element: <Navigate to={routePath.main} replace />,
        path: routePath.default,
        label: "",
        auth: false,
        allowedRoles: [],
    },

    [AppRoutes.MAIN]: {
        element: <MainPage />,
        path: routePath.main,
        label: "r-main",
        auth: false,
        allowedRoles: [],
    },

    [AppRoutes.DETAILS]: {
        element: <DetailsPage />,
        path: routePath.details + "/:id",
        label: "",
        auth: false,
        allowedRoles: [],
    },

    [AppRoutes.SEARCH]: {
        element: <SearchPage />,
        path: routePath.search,
        label: "r-search",
        auth: false,
        allowedRoles: [],
    },

    [AppRoutes.LOGIN]: {
        element: <LoginPage />,
        path: routePath.login,
        label: "r-login",
        auth: false,
        allowedRoles: [],
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
};
