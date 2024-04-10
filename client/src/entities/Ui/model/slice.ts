import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { routeConfig } from "@/app/router/router";
import { BreadcrumbsT, UiSchema, TAppearances } from "./types";

const initialState: UiSchema = {
    sb: true,
    na: true,
    scroll: {},
    appearance: "tile",
    breadcrumbs: {
        details: [],
        main: null,
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sb = !state.sb;
        },
        closeSidebar: (state) => {
            state.sb = true;
        },
        toggleNavbarAuth: (state, action: PayloadAction<boolean>) => {
            state.na = action.payload;
        },
        saveScrollPosition: (
            state,
            action: PayloadAction<{ path: string; scrollPosition: number }>
        ) => {
            const { path, scrollPosition } = action.payload;
            state.scroll[path] = scrollPosition;
        },
        deleteScrollPosition: (state, action) => {
            const path = action.payload;
            if (path in state.scroll) delete state.scroll[path];
        },
        setAppearance: (state, action: PayloadAction<TAppearances>) => {
            state.appearance = action.payload;
        },

        initializeBreadcrumbs: (state, action: PayloadAction<string>) => {
            const pathname = action.payload;
            const label = Object.values(routeConfig).find(
                (route) => route.path === pathname
            )?.label;
            if (label) state.breadcrumbs = { details: [], main: { label, pathname } };
        },
        addBreadcrumbs: (state, action: PayloadAction<BreadcrumbsT>) => {
            const newBreadcrumb = action.payload;
            state.breadcrumbs.details = state.breadcrumbs.details.filter(
                (breadcrumb) => breadcrumb.pathname !== newBreadcrumb.pathname
            );
            state.breadcrumbs.details.push(newBreadcrumb);
        },
        resetUi: () => initialState,
    },
});

export const { actions: uiActions, reducer: uiReducer } = uiSlice;
