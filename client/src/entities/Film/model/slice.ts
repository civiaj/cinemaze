import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
    FilmSchema,
    TFavoritesListVariants,
    TFilm,
    TSearchCategories,
    TTopCategories,
} from "./types";

export const adapter = createEntityAdapter<TFilm>({
    selectId: (film) => film.id,
});

const initialState: FilmSchema = {
    films: adapter.getInitialState(),
    page: 1,
    route: null,
    query: {
        top: "TOP_100_POPULAR_FILMS",
        favorite: "all",
        search: "NUM_VOTE",
    },
};

const filmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setFilm: (state, action: PayloadAction<TFilm[]>) => {
            adapter.addMany(state.films, action.payload);
        },
        setMainQuery: (state, action: PayloadAction<TTopCategories>) => {
            filmSlice.caseReducers.clean(state);
            state.query.top = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<TSearchCategories>) => {
            filmSlice.caseReducers.clean(state);
            state.query.search = action.payload;
        },
        setFavoriteQuery: (state, action: PayloadAction<TFavoritesListVariants>) => {
            filmSlice.caseReducers.clean(state);
            state.query.favorite = action.payload;
        },
        setRoute: (state, action: PayloadAction<FilmSchema["route"]>) => {
            filmSlice.caseReducers.clean(state);
            state.route = action.payload;
        },
        clean: (state) => {
            state.page = 1;
            adapter.removeAll(state.films);
        },
        removeFilm: (state, action: PayloadAction<number>) => {
            adapter.removeOne(state.films, action.payload);
        },
        updateFilm: (state, action: PayloadAction<{ id: number; changes: Partial<TFilm> }>) => {
            adapter.updateOne(state.films, action.payload);
        },
    },
});

export const { actions: filmActions, reducer: filmReducer } = filmSlice;
