import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "entities/User/model/types";

type TUserState = {
    user: TUser | null;
    isLogged: boolean;
};

const initialState: TUserState = {
    user: null,
    isLogged: document.cookie.includes("logged=true"),
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
        },
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
            state.isLogged = true;
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
