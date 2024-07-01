import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TFavorites, TFavoritesListVariants, TFilm } from "@/entities/Film";
import { FavoritePageSchema } from "./types";

export const adapter = createEntityAdapter<TFilm & TFavorites>({
    selectId: (film) => film.id,
});

const initialState: FavoritePageSchema = {
    listVariant: "all",
    films: adapter.getInitialState(),
    page: 1,
};

const userPageSlice = createSlice({
    name: "userPageSlice",
    initialState,
    reducers: {
        setFavoriteList: (state, action: PayloadAction<TFavoritesListVariants>) => {
            state.listVariant = action.payload;
            state.page = initialState.page;
            adapter.removeAll(state.films);
        },
        setFavoriteFilms: (state, action: PayloadAction<(TFilm & TFavorites)[]>) => {
            adapter.addMany(state.films, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        cleanInfiniteFilms: (state) => {
            adapter.removeAll(state.films);
            state.page = 1;
        },
        removeFilm: (state, action: PayloadAction<number>) => {
            adapter.removeOne(state.films, action);
        },
        resetSlice: () => initialState,
    },
});

export const { actions: favoritePageActions, reducer: favoritePageReducer } = userPageSlice;
