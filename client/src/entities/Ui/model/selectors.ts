import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const getSidebarCollapsed = (state: RootState) => state.ui.sb;
export const getNavbarAuthCollapsed = (state: RootState) => state.ui.na;
export const getUiAppearance = (state: RootState) => state.ui.appearance;
export const getBreadcrumbs = (state: RootState) => state.ui.breadcrumbs;

const getPageScoll = (state: RootState) => state.ui.scroll;
export const getScrollByPath = createSelector(
    [getPageScoll, (_, path: string) => path],
    (scroll, path) => scroll[path]
);

export const allowNavbarScroll = createSelector(
    [getSidebarCollapsed, getNavbarAuthCollapsed],
    (sidebarIsCollapsed, navbarAuthIsCollapsed) => {
        return (sidebarIsCollapsed && navbarAuthIsCollapsed) === true;
    }
);
