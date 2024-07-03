import { createSlice } from "@reduxjs/toolkit";
import { USER_QUERY_MAX } from "@/shared/const/const";
import { SearchPageSchema } from "../model/types";

const initialState: SearchPageSchema = {
    userQueries: [],
};

const searchPageSlice = createSlice({
    name: "searchPageSlice",
    initialState,
    reducers: {
        addUserQuery: (state, action) => {
            const newQuery = action.payload;
            if (!newQuery) return;
            const existIndex = state.userQueries.findIndex((str) => str === newQuery);
            if (existIndex === -1) {
                state.userQueries.unshift(newQuery);
                state.userQueries.length > USER_QUERY_MAX && state.userQueries.pop();
            } else {
                const existItem = state.userQueries.splice(existIndex, 1);
                state.userQueries.unshift(...existItem);
            }
        },
        deleteUserQuery: (state, action) => {
            state.userQueries = state.userQueries.filter((query) => query !== action.payload);
        },
    },
});

export const { actions: searchPageActions, reducer: searchPageReducer } = searchPageSlice;
