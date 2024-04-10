import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { USER_QUERY_MAX } from "@/shared/const/const";
import { SearchOrderT, SearchPageSchema } from "../model/types";

export const searchPageAdapter = createEntityAdapter<FilmT>({
    selectId: (film) => film.filmId,
});

const initialState: SearchPageSchema = {
    searchPageFilms: searchPageAdapter.getInitialState(),
    page: 1,
    userQueries: [],
    order: "NUM_VOTE",
};

const searchPageSlice = createSlice({
    name: "searchPageSlice",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SearchOrderT>) => {
            state.order = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearchFilms: (state, action: PayloadAction<FilmT[]>) => {
            searchPageAdapter.addMany(state.searchPageFilms, action.payload);
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
            searchPageAdapter.removeAll(state.searchPageFilms);
            state.page = 1;
        },
    },
});

export const { actions: searchPageActions, reducer: searchPageReducer } = searchPageSlice;
