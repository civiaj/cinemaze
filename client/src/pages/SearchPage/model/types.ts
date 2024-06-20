import { EntityState } from "@reduxjs/toolkit";
import { ChangeEvent, KeyboardEvent } from "react";

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

export interface SearchPageSchema {
    searchPageFilms: EntityState<FilmT>;
    page: number;
    order: SearchOrderT;
    userQueries: string[];
}

export type SearchQuery = {
    country: number | null;
    genre: number | null;
    ratingFrom: number;
    ratingTo: number;
    yearFrom: number;
    yearTo: number;
    keyword: string;
};

export type SearchQueryKeys = keyof SearchQuery;

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

export type SearchInputFormProps = {
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    inputValue: string;
    onSetActive: () => void;
    isActive: boolean;
    handleStartSearch: (query?: string) => void;
    onCleanInput: () => void;
    focused?: boolean;
};
