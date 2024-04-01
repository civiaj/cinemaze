import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectUser = (state: RootState) => state.user.user;
export const getIsLogged = (state: RootState) => state.user.isLogged;
export const getIsAdmin = createSelector(selectUser, (user) => {
    if (user && user.role) {
        return ["admin", "admin-test"].includes(user.role);
    }
    return false;
});
