import { filmApi } from "shared/api/filmApi";

import {
    SearchFiltersQueryT,
    SearchFiltersT,
    SearchQueryProps,
    SearchQueryResultT,
    SearchQueryT,
} from "../model/types";

const searchPageApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        filters: builder.query<SearchFiltersT, void>({
            query: () => `/v2.2/films/filters`,

            transformResponse: (response: SearchFiltersQueryT) => {
                const newGenres = response.genres
                    .filter((value) => value.genre)
                    .map((value) => ({ label: value.genre, value: value.id }));

                const newCountries = response.countries
                    .filter((value) => value.country)
                    .map((value) => ({ label: value.country, value: value.id }));

                return {
                    genres: newGenres,
                    countries: newCountries,
                };
            },
        }),
        search: builder.query<SearchQueryT, SearchQueryProps>({
            query: ({
                country,
                genre,
                keyword,
                order,
                ratingFrom,
                ratingTo,
                yearFrom,
                yearTo,
                page,
            }) => ({
                url: `/v2.2/films?${country ? `countries=${country}` : ""}&${
                    genre ? `genres=${genre}` : ""
                }&order=${order}&type=ALL&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&${
                    keyword ? `keyword=${keyword}` : ""
                }&page=${page}`,
            }),

            transformResponse: (response: SearchQueryResultT) => {
                return {
                    ...response,
                    films: response.items.map((item) => ({
                        filmId: item.kinopoiskId,
                        nameRu: item.nameRu,
                        nameEn: item.nameEn,
                        nameOriginal: item.nameOriginal,
                        year: String(item.year),
                        countries: item.countries,
                        genres: item.genres,
                        rating: String(item.ratingKinopoisk),
                        posterUrlPreview: item.posterUrlPreview,
                    })),
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useFiltersQuery, useSearchQuery, useLazySearchQuery } = searchPageApi;
