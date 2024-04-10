import { filmApi } from "@/shared/api/filmApi";
import { getHoursAndMinutes } from "@/shared/lib/getHoursAndMinutes";
import {
    GetReviewProps,
    ReviewQueryT,
    SimilarsQueryT,
    FilmAwardsItemListT,
    FilmAwardsT,
    FilmAwardsQueryT,
    GetFilmImagesResult,
    GetFilmImagesProps,
    DetailsT,
    DetailsQueryT,
} from "./types";

const filmDetailsApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<ReviewQueryT, GetReviewProps>({
            query: ({ id, type, page }) => `/v2.2/films/${id}/reviews?page=${page}&order=${type}`,
        }),
        similars: builder.query<SimilarsQueryT, number>({
            query: (id) => `/v2.2/films/${id}/similars`,
        }),
        getFilmAwards: builder.query<FilmAwardsT, number>({
            query: (id) => `v2.2/films/${id}/awards`,
            transformResponse: (response: FilmAwardsQueryT) => {
                const nominationNames = new Set([...response.items.map((item) => item.name)]);
                const newData: FilmAwardsItemListT[] = [];
                nominationNames.forEach((nominationName) => {
                    const similar = response.items.find((item) => item.name === nominationName);
                    if (similar) {
                        const newObj: FilmAwardsItemListT = {
                            imageUrl: similar.imageUrl,
                            name: similar.name,
                            year: similar.year,
                            nominates: response.items
                                .filter((item) => item.name === nominationName && !item.win)
                                .map((item) => ({
                                    nominationName: item.nominationName,
                                    persons: item.persons,
                                })),
                            wins: response.items
                                .filter((item) => item.name === nominationName && item.win)
                                .map((item) => ({
                                    nominationName: item.nominationName,
                                    persons: item.persons,
                                })),
                        };
                        newData.push(newObj);
                    }
                });

                return { total: response.total, items: newData };
            },
        }),
        getFilmImages: builder.query<GetFilmImagesResult, GetFilmImagesProps>({
            query: ({ id, type, page }) => `v2.2/films/${id}/images?type=${type}&page=${page}`,
        }),
        details: builder.query<DetailsT, number>({
            query: (filmId) => `/v2.2/films/${filmId}`,
            transformResponse: (response: DetailsQueryT) => ({
                filmId: response.kinopoiskId,
                nameRu: response.nameRu,
                nameEn: response.nameEn,
                nameOriginal: response.nameOriginal,
                year: String(response.year),
                filmLength: response.filmLength ? String(response.filmLength) : undefined,
                countries: response.countries,
                genres: response.genres,
                rating: response.ratingKinopoisk ? String(response.ratingKinopoisk) : undefined,
                posterUrlPreview: response.posterUrlPreview,
                posterUrl: response.posterUrl,
                reviewsCount: response.reviewsCount,
                ratingImdb: response.ratingImdb,
                link: response.webUrl,
                slogan: response.slogan,
                ratingMpaa: response.ratingMpaa,
                ratingAgeLimits: response.ratingAgeLimits
                    ? response.ratingAgeLimits.replace(/\D/g, "") + "+"
                    : response.ratingAgeLimits,
                ratingKinopoiskVoteCount: response.ratingKinopoiskVoteCount,
                filmLengthMins: response.filmLength ? String(response.filmLength) : undefined,
                filmLengthHours: response.filmLength
                    ? getHoursAndMinutes(response.filmLength)
                    : undefined,
                description: response.description,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetReviewsQuery,
    useSimilarsQuery,
    useGetFilmAwardsQuery,
    useGetFilmImagesQuery,
    useDetailsQuery,
    useLazyDetailsQuery,
} = filmDetailsApi;
