import { EntityState } from "@reduxjs/toolkit";

export interface FilmsQueryT {
    pagesCount: number;
    films: FilmT[];
}

export interface FilmDataT {
    totalPages: number;
    films: FilmT[];
}

export const mainQueries = {
    TOP_250_BEST_FILMS: "TOP_250_BEST_FILMS",
    TOP_100_POPULAR_FILMS: "TOP_100_POPULAR_FILMS",
    TOP_AWAIT_FILMS: "TOP_AWAIT_FILMS",
} as const;

export type MainQueryT = ObjectValues<typeof mainQueries>;

export interface MainPageSchema {
    mainQuery: MainQueryT;
    mainPageFilms: EntityState<FilmT>;
    page: number;
}
