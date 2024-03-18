import { filmApi } from "shared/api/filmApi";

import {
    SearchFiltersQueryT,
    SearchFiltersT,
    SearchOrderT,
    SearchQuery,
    SearchQueryResultT,
    SearchQueryT,
} from "../model/types";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "shared/const/const";

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
        search: builder.query<
            SearchQueryT,
            Partial<SearchQuery & { order: SearchOrderT; page: number }>
        >({
            query: (payload) => {
                const {
                    country,
                    genre,
                    keyword,
                    order = "NUM_VOTE",
                    page = 1,
                    ratingFrom = RATING_FROM_MIN,
                    ratingTo = RATING_TO_MAX,
                    yearFrom = YEAR_FROM_MIN,
                    yearTo = YEAR_TO_MAX,
                } = payload;

                const pCountry = country ? `countries=${country}` : "";
                const pGenre = genre ? `genres=${genre}` : "";
                const pKeyword = keyword ? `keyword=${keyword}` : "";

                return `/v2.2/films?${pCountry}&${pGenre}&order=${order}&type=ALL&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&${pKeyword}&page=${page}`;
            },

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
