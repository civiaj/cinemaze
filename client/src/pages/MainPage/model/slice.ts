import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TFilm, TTopCategories } from "@/entities/Film";
import { MainPageSchema } from "./types";

export const adapter = createEntityAdapter<TFilm>({
    selectId: (film) => film.id,
});

const initialState: MainPageSchema = {
    query: "TOP_100_POPULAR_FILMS",
    films: adapter.getInitialState(),
    page: 1,
};

const mainPageSlice = createSlice({
    name: "mainPageSlice",
    initialState,
    reducers: {
        setMainQuery: (state, action: PayloadAction<TTopCategories>) => {
            state.query = action.payload;
            state.page = initialState.page;
            adapter.removeAll(state.films);
        },

        setMainPageFilms: (state, action: PayloadAction<TFilm[]>) => {
            adapter.addMany(state.films, action.payload);
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        cleanInfiniteFilms: (state) => {
            adapter.removeAll(state.films);
            state.page = 1;
        },
    },
});

export const { actions: mainPageActions, reducer: mainPageReducer } = mainPageSlice;
