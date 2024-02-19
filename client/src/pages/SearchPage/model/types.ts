import { EntityState } from "@reduxjs/toolkit";

export interface SearchFiltersQueryT {
    genres: { id: number; genre: string }[];
    countries: { id: number; country: string }[];
}

export interface SearchFiltersT {
    genres: { value: number; label: string }[];
    countries: { value: number; label: string }[];
}

export const searchOrders = {
    RATING: "RATING",
    NUM_VOTE: "NUM_VOTE",
    YEAR: "YEAR",
} as const;

export type SearchOrderT = ObjectValues<typeof searchOrders>;

export type SearchParamsT = {
    country: number | null;
    genre: number | null;
    ratingFrom: number;
    ratingTo: number;
    yearFrom: number;
    yearTo: number;
    keyword: string;
    order: SearchOrderT;
};

export interface SearchPageSchema {
    searchPageFilms: EntityState<FilmT>;
    previousQuery: SearchParamsT;
    isInitial: boolean;
    page: number;
    query: SearchParamsT;
    userQueries: string[];
    initialQuery: SearchParamsT;
}

export interface SearchQueryProps extends SearchParamsT {
    page: number;
}

export interface SearchQueryResultT {
    total: number;
    totalPages: number;
    items: {
        kinopoiskId: number;
        imdbId: string;
        nameRu: string;
        nameEn: string;
        nameOriginal: string;
        countries: { country: string }[];
        genres: { genre: string }[];
        ratingKinopoisk: number;
        ratingImdb: number;
        year: number;
        type: string;
        posterUrl: string;
        posterUrlPreview: string;
    }[];
}

export interface SearchQueryT {
    total: number;
    totalPages: number;
    films: FilmT[];
}
