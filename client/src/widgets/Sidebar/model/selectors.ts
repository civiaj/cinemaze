import { routeConfig, routePath } from "app/router/router";
import { SideBarItem } from "./types";
import { Home, Favorite, Search, Statistics } from "shared/assets/icons";
import { createSelector } from "@reduxjs/toolkit";
import { getIsLogged } from "entities/User";

export const getSidebarItems = createSelector(getIsLogged, (isLogged) => {
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

    return sidebarItems;
});
