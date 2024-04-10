import { DetailsQueryT, DetailsT } from "@/pages/DetailsPage/model/types";
import { filmApi } from "@/shared/api/filmApi";
import { getHoursAndMinutess } from "@/shared/lib/getHoursAndMinutess";

const detailsApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
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
                    ? getHoursAndMinutess(response.filmLength)
                    : undefined,
                description: response.description,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useDetailsQuery, useLazyDetailsQuery } = detailsApi;
