import { createSlice } from "@reduxjs/toolkit";

const authAndUserSlice = createSlice({
    initialState: { isLoading: false },
    name: "authAndUserSlice",
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        endLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export const { actions: authAndUserSliceActions, reducer: authAndUserSliceReducer } =
    authAndUserSlice;
