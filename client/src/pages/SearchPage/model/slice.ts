import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TFilm, TSearchCategories } from "@/entities/Film";
import { USER_QUERY_MAX } from "@/shared/const/const";
import { SearchPageSchema } from "../model/types";

export const adapter = createEntityAdapter<TFilm>({
    selectId: (film) => film.id,
});

const initialState: SearchPageSchema = {
    films: adapter.getInitialState(),
    page: 1,
    userQueries: [],
    order: "NUM_VOTE",
};

const searchPageSlice = createSlice({
    name: "searchPageSlice",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<TSearchCategories>) => {
            state.order = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearchFilms: (state, action: PayloadAction<TFilm[]>) => {
            adapter.addMany(state.films, action.payload);
        },
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

        cleanInfiniteFilms: (state) => {
            adapter.removeAll(state.films);
            state.page = 1;
        },
    },
});

export const { actions: searchPageActions, reducer: searchPageReducer } = searchPageSlice;
