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
        logout: () => {
            // action type 'userSlice/logout' resets all redux store state and removes persist storage. See store.ts.
        },
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
            state.isLogged = true;
        },
        setIsLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload;
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
