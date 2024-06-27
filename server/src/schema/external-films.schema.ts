import { TypeOf, object, string, z } from "zod";

export const getTopSchema = object({
    query: object({
        type: z.enum(["TOP_AWAIT_FILMS", "TOP_100_POPULAR_FILMS", "TOP_250_BEST_FILMS"], {
            required_error: "Параметр type обязателен",
        }),
        page: string({ required_error: "Параметр page обязателен" }),
    }),
});

export const getExternalDataByIdSchema = object({
    params: object({
        id: string({ required_error: "Параметр id обязателен" }),
    }),
});

export const getImagesSchema = object({
    query: object({
        page: string({ required_error: "Параметр page обязателен" }),
        id: string({ required_error: "Параметр id обязателен" }),
        type: z.enum(
            [
                "STILL",
                "SHOOTING",
                "POSTER",
                "FAN_ART",
                "PROMO",
                "CONCEPT",
                "WALLPAPER",
                "COVER",
                "SCREENSHOT",
            ],
            { required_error: "Параметр type обязателен" }
        ),
    }),
});

export const getReviewsSchema = object({
    query: object({
        page: string({ required_error: "Параметр page обязателен" }),
        id: string({ required_error: "Параметр id обязателен" }),
        type: z.enum(["DATE_ASC", "DATE_DESC"], { required_error: "Параметр type обязателен" }),
    }),
});

export const getSearchResultsSchema = object({
    query: object({
        country: string(),
        genre: string(),
        keyword: string(),
        order: z.enum(["RATING", "NUM_VOTE", "YEAR"], {
            required_error: "Параметр order обязателен",
        }),
        page: string({ required_error: "Параметр page обязателен" }),
        ratingFrom: string(),
        ratingTo: string(),
        yearFrom: string(),
        yearTo: string(),
    }),
});

export type GetTopInput = TypeOf<typeof getTopSchema>["query"];
export type getExternalDataByIdInput = TypeOf<typeof getExternalDataByIdSchema>["params"];
export type GetImagesInput = TypeOf<typeof getImagesSchema>["query"];
export type GetReviewsInput = TypeOf<typeof getReviewsSchema>["query"];
export type GetSearchResultsInput = TypeOf<typeof getSearchResultsSchema>["query"];
