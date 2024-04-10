import { createSelector } from "@reduxjs/toolkit";
import { routeConfig, routePath } from "@/app/router/router";
import { getIsLogged } from "@/entities/User";
import { getIsAdmin } from "@/entities/User/model/selectors";
import { Home, Favorite, Search, Statistics, UserGroup } from "@/shared/assets/icons";
import { SideBarItem } from "./types";

export const getSidebarItems = createSelector([getIsLogged, getIsAdmin], (isLogged, isAdmin) => {
    const sidebarItems: SideBarItem[] = [
        {
            label: routeConfig.main.label,
            to: routePath.main,
            Icon: Home,
        },
        {
            label: routeConfig.favorite.label,
            to: routePath.favorite,
            Icon: Favorite,
        },
    ];

    if (isLogged)
        sidebarItems.push({
            label: routeConfig.statistics.label,
            to: routePath.statistics,
            Icon: Statistics,
        });

    sidebarItems.push({
        label: routeConfig.search.label,
        to: routePath.search,
        Icon: Search,
    });

    if (isAdmin)
        sidebarItems.push({
            label: routeConfig.manage.label,
            to: routePath.manage,
            Icon: UserGroup,
        });

    return sidebarItems;
});
