import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

export const getSidebarIsOpen = (state: RootState) => state.ui.sidebarIsOpen;
export const getNavbarAuthPopupIsOpen = (state: RootState) => state.ui.navbarAuthPopupIsOpen;
export const getUiAppearance = (state: RootState) => state.ui.appearance;
export const getBreadcrumbs = (state: RootState) => state.ui.breadcrumbs;

const getPageScoll = (state: RootState) => state.ui.scroll;
export const getScrollByPath = createSelector(
    [getPageScoll, (_, path: string) => path],
    (scroll, path) => scroll[path]
);

export const allowNavbarScroll = createSelector(
    [getSidebarIsOpen, getNavbarAuthPopupIsOpen],
    (sidebarIsOpen, navbarAuthPopupIsOpen) => {
        return (sidebarIsOpen === false && navbarAuthPopupIsOpen === false) === true;
    }
);

export const getIsMobile = (state: RootState) => state.ui.isMobile;
