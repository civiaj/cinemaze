import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TFavorite } from "entities/Favorite";

import { FavoriteListVariantT, FavoritePageSchema } from "./types";

export const favoritePageAdapter = createEntityAdapter<FilmT & TFavorite>({
    selectId: (film) => film.filmId,
});

const initialState: FavoritePageSchema = {
    listVariant: "userScore",
    favoritePageFilms: favoritePageAdapter.getInitialState(),
    page: 1,
};

const userPageSlice = createSlice({
    name: "userPageSlice",
    initialState,
    reducers: {
        setFavoriteList: (state, action: PayloadAction<FavoriteListVariantT>) => {
            state.listVariant = action.payload;
            state.page = initialState.page;
            favoritePageAdapter.removeAll(state.favoritePageFilms);
        },
        setFavoriteFilms: (state, action: PayloadAction<(FilmT & TFavorite)[]>) => {
            favoritePageAdapter.addMany(state.favoritePageFilms, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        cleanInfiniteFilms: (state) => {
            favoritePageAdapter.removeAll(state.favoritePageFilms);
            state.page = 1;
        },
        removeFilm: (state, action: PayloadAction<number>) => {
            favoritePageAdapter.removeOne(state.favoritePageFilms, action);
        },
        resetSlice: () => initialState,
    },
});

export const { actions: favoritePageActions, reducer: favoritePageReducer } = userPageSlice;
