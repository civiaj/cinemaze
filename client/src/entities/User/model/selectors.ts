import { RootState } from "app/store";

export const selectUser = (state: RootState) => state.user.user;
export const getIsLogged = (state: RootState) => state.user.isLogged;
