import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetAllUsersFilter, ManageSchema } from "./types";

const initialState: ManageSchema = {
    filter: "displayName",
    order: 1,
};

const manageSlice = createSlice({
    initialState,
    name: "manage",
    reducers: {
        setFilter: (state, action: PayloadAction<GetAllUsersFilter>) => {
            state.filter = action.payload;
            state.order = 1;
        },
        toggleOrder: (state) => {
            state.order = state.order === 1 ? -1 : 1;
        },
    },
});

export const { actions: manageActions, reducer: manageReducer } = manageSlice;
