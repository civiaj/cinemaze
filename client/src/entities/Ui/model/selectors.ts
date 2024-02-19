import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const getSidebarCollapsed = (state: RootState) => state.ui.collapsed;
export const getPageScoll = (state: RootState) => state.ui.scroll;
export const getUiAppearance = (state: RootState) => state.ui.appearance;
export const getBreadcrumbs = (state: RootState) => state.ui.breadcrumbs;

export const getScrollByPath = createSelector(
    [getPageScoll, (_, path: string) => path],
    (scroll, path) => scroll[path]
);
