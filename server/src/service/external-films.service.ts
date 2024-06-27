import { unofficialKinopoiskApi } from "../api/unofficial-kp.api";
import {
    getExternalDataByIdInput,
    GetImagesInput,
    GetReviewsInput,
    GetSearchResultsInput,
    GetTopInput,
} from "../schema/external-films.schema";
import {
    Awards,
    AwardsItem,
    Details,
    Filters,
    SearchResults,
    Similars,
    Top,
    UnofficialKinopoiskAwards,
    UnofficialKinopoiskDetails,
    UnofficialKinopoiskFilters,
    UnofficialKinopoiskSimilars,
    UnofficialKinopoiskTop,
    UnofficialKinpoiskSearch,
} from "../types/types";
import { formatHours, formatMinutes } from "../utils/formatMinutes";

class ExternalFilmsService {
    async top({ page, type }: GetTopInput): Promise<Top> {
        const response = await unofficialKinopoiskApi.get(
            `/v2.2/films/top?type=${type}&page=${page}`
        );
        const { films, pagesCount }: UnofficialKinopoiskTop = response.data;
        return {
            totalPages: pagesCount,
            films: films.map((film) => {
                const {
                    filmId,
                    filmLength,
                    nameEn,
                    year,
                    rating,
                    countries,
                    genres,
                    nameRu,
                    posterUrlPreview,
                } = film;

                return {
                    id: filmId,
                    filmLengthMins: formatHours(filmLength),
                    filmLengthHours: filmLength,
                    nameOriginal: nameEn,
                    year: Number(year) || null,
                    rating: Number(rating) || null,
                    countries,
                    genres,
                    nameEn,
                    nameRu,
                    posterUrlPreview,
                };
            }),
        };
    }
    async details({ id }: getExternalDataByIdInput): Promise<Details> {
        const { data } = await unofficialKinopoiskApi.get(`/v2.2/films/${id}`);
        const {
            countries,
            description,
            kinopoiskId,
            genres,
            nameEn,
            nameRu,
            nameOriginal,
            posterUrl,
            posterUrlPreview,
            ratingKinopoisk,
            ratingKinopoiskVoteCount,
            ratingImdb,
            ratingMpaa,
            reviewsCount,
            slogan,
            webUrl,
            ratingAgeLimits,
            year,
            filmLength,
        }: UnofficialKinopoiskDetails = data;
        return {
            countries,
            description,
            id: kinopoiskId,
            filmLengthHours: formatMinutes(filmLength),
            filmLengthMins: filmLength,
            genres,
            nameEn,
            nameOriginal,
            nameRu,
            posterUrl,
            posterUrlPreview,
            rating: ratingKinopoisk,
            ratingAgeLimits: ratingAgeLimits?.replace("age", "+") || null,
            ratingImdb,
            ratingKinopoiskVoteCount,
            ratingMpaa,
            reviewsCount,
            slogan,
            webUrl,
            year,
        };
    }
    async images({ id, page, type }: GetImagesInput) {
        const { data } = await unofficialKinopoiskApi.get(
            `/v2.2/films/${id}/images?type=${type}&page=${page}`
        );
        return data;
    }
    async reviews({ id, page, type }: GetReviewsInput) {
        const { data } = await unofficialKinopoiskApi.get(
            `/v2.2/films/${id}/reviews?page=${page}&order=${type}`
        );
        return data;
    }
    async similars({ id }: getExternalDataByIdInput): Promise<Similars> {
        const response = await unofficialKinopoiskApi.get(`/v2.2/films/${id}/similars`);
        const { items, total }: UnofficialKinopoiskSimilars = response.data;

        return {
            total,
            items: items.map(({ filmId, nameEn, nameOriginal, nameRu, posterUrlPreview }) => ({
                id: filmId,
                nameEn,
                nameOriginal,
                nameRu,
                posterUrlPreview,
            })),
        };
    }
    async awards({ id }: getExternalDataByIdInput): Promise<Awards> {
        const response = await unofficialKinopoiskApi.get(`/v2.2/films/${id}/awards`);
        const rewards: UnofficialKinopoiskAwards = response.data;
        const nominations = new Set([...rewards.items.map((item) => item.name)]);
        const items: AwardsItem[] = [];
        nominations.forEach((names) => {
            const similar = rewards.items.find((item) => item.name === names);
            if (similar) {
                const { imageUrl, name, year } = similar;
                const item: AwardsItem = {
                    imageUrl,
                    name,
                    year,
                    nominates: [],
                    wins: [],
                };
                rewards.items.forEach(({ name, win, nominationName, persons }) => {
                    if (name === names) {
                        const body = { nominationName, persons };
                        win ? item.wins.push(body) : item.nominates.push(body);
                    }
                });
                items.push(item);
            }
        });
        return { total: rewards.total, items };
    }
    async filters(): Promise<Filters> {
        const response = await unofficialKinopoiskApi.get(`/v2.2/films/filters`);
        const data: UnofficialKinopoiskFilters = response.data;
        return {
            genres: data.genres
                .filter((value) => value.genre)
                .map(({ genre, id }) => ({ label: genre!, value: id })),
            countries: data.countries
                .filter((value) => value.country)
                .map(({ country, id }) => ({ label: country!, value: id })),
        };
    }

    async search(input: GetSearchResultsInput): Promise<SearchResults> {
        const { order, page, ratingFrom, ratingTo, yearFrom, yearTo, country, genre, keyword } =
            input;
        const entities = [
            ["countries", country],
            ["genres", genre],
            ["keyword", keyword],
            ["order", order],
            ["ratingFrom", ratingFrom],
            ["ratingTo", ratingTo],
            ["yearFrom", yearFrom],
            ["yearTo", yearTo],
            ["type", "ALL"],
            ["page", page],
        ];
        const queries = [];
        for (let i = 0; i < entities.length; i++) {
            const [key, value] = entities[i];
            if (!value || value === "null") continue;
            queries.push(`${key}=${value}`);
        }
        const response = await unofficialKinopoiskApi.get(`/v2.2/films?${queries.join("&")}`);
        const { items, total, totalPages }: UnofficialKinpoiskSearch = response.data;
        return {
            total,
            totalPages,
            films: items.map(
                ({
                    countries,
                    genres,
                    kinopoiskId,
                    nameEn,
                    nameOriginal,
                    nameRu,
                    posterUrlPreview,
                    ratingKinopoisk,
                    year,
                }) => ({
                    countries,
                    filmLengthHours: null,
                    filmLengthMins: null,
                    genres,
                    id: kinopoiskId,
                    nameEn,
                    nameOriginal,
                    nameRu,
                    posterUrlPreview,
                    rating: ratingKinopoisk,
                    year,
                })
            ),
        };
    }
}

export default new ExternalFilmsService();
