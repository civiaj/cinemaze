import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MainPageSchema, MainQueryT } from "../model/types";

export const mainPageAdapter = createEntityAdapter<FilmT>({
    selectId: (film) => film.filmId,
});

const initialState: MainPageSchema = {
    mainQuery: "TOP_100_POPULAR_FILMS",
    mainPageFilms: mainPageAdapter.getInitialState(),
    page: 1,
};

const mainPageSlice = createSlice({
    name: "mainPageSlice",
    initialState,
    reducers: {
        setMainQuery: (state, action: PayloadAction<MainQueryT>) => {
            state.mainQuery = action.payload;
            state.page = initialState.page;
            mainPageAdapter.removeAll(state.mainPageFilms);
        },

        setMainPageFilms: (state, action: PayloadAction<FilmT[]>) => {
            mainPageAdapter.addMany(state.mainPageFilms, action.payload);
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        cleanInfiniteFilms: (state) => {
            mainPageAdapter.removeAll(state.mainPageFilms);
            state.page = 1;
        },
    },
});

export const { actions: mainPageActions, reducer: mainPageReducer } = mainPageSlice;
