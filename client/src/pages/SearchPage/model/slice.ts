import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RATING_TO_MAX, USER_QUERY_MAX, YEAR_TO_MAX } from "shared/const/const";
import { SearchOrderT, SearchPageSchema, SearchParamsT } from "pages/SearchPage/model/types";

export const searchPageAdapter = createEntityAdapter<FilmT>({
    selectId: (film) => film.filmId,
});

const initialQuery: SearchParamsT = {
    country: null,
    genre: null,
    keyword: "",
    ratingFrom: 0,
    ratingTo: 10,
    yearFrom: 1890,
    yearTo: 2100,
    order: "RATING",
};

const initialState: SearchPageSchema = {
    searchPageFilms: searchPageAdapter.getInitialState(),
    initialQuery: { ...initialQuery },
    previousQuery: { ...initialQuery },
    isInitial: true,
    page: 1,
    query: { ...initialQuery },
    userQueries: [],
};

const searchPageSlice = createSlice({
    name: "searchPageSlice",
    initialState,
    reducers: {
        setRatingFrom: (state, action: PayloadAction<number>) => {
            state.query.ratingFrom = action.payload;
            if (action.payload >= state.query.ratingTo && action.payload !== RATING_TO_MAX)
                state.query.ratingTo = RATING_TO_MAX;
        },

        setRatingTo: (state, action: PayloadAction<number>) => {
            state.query.ratingTo = action.payload;
        },

        setYearFrom: (state, action: PayloadAction<number>) => {
            state.query.yearFrom = action.payload;
            if (action.payload >= state.query.yearTo && action.payload !== YEAR_TO_MAX)
                state.query.yearTo = YEAR_TO_MAX;
        },

        setYearTo: (state, action: PayloadAction<number>) => {
            state.query.yearTo = action.payload;
        },
        setCountry: (state, action: PayloadAction<number>) => {
            state.query.country = action.payload;
        },
        resetCountry: (state) => {
            state.query.country = initialState.query.country;
        },
        setGenre: (state, action: PayloadAction<number>) => {
            state.query.genre = action.payload;
        },
        resetGenre: (state) => {
            state.query.genre = initialState.query.genre;
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.query.keyword = action.payload;
        },
        setOrder: (state, action: PayloadAction<SearchOrderT>) => {
            state.query.order = action.payload;
        },
        startSearch: (state) => {
            state.previousQuery = state.query;
            searchPageAdapter.removeAll(state.searchPageFilms);
            state.page = initialState.page;
            state.isInitial = false;
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
        searchBarStart: (state, action: PayloadAction<string>) => {
            state.query = state.initialQuery;
            state.query.keyword = action.payload;
            state.previousQuery = state.query;
            searchPageAdapter.removeAll(state.searchPageFilms);
            state.page = initialState.page;
            state.isInitial = false;
        },
        resetSearchQuery: (state) => {
            state.query = initialQuery;
        },
        cleanInfiniteFilms: (state) => {
            searchPageAdapter.removeAll(state.searchPageFilms);
            state.page = 1;
        },
    },
});

export const { actions: searchPageActions, reducer: searchPageReducer } = searchPageSlice;
