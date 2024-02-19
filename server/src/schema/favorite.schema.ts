import { TypeOf, boolean, number, object, string, z } from "zod";

export const createFavoriteSchema = object({
    body: object({
        favorite: object({
            bookmarked: boolean().optional(),
            userScore: number().optional().nullish(),
            hidden: boolean().optional(),
        }),
    }),
});

const filters = ["all", "bookmarked", "userScore", "hidden"] as const;

export const getFavoriteAllSchema = object({
    query: object({
        page: string({ required_error: "Параметр page обязателен" }),
        filter: z.enum(filters),
    }),
});

export const getFavoriteOneSchema = object({
    params: object({
        filmId: string({ required_error: "Параметр filmId обязателен" }),
    }),
});

export const removeFavoriteOneSchema = object({
    body: object({
        filmId: number({ required_error: "Параметр filmId обязателен" }),
        field: z.enum(filters),
    }),
});

export type CreateFavoriteInput = TypeOf<typeof createFavoriteSchema>["body"];
export type GetFavoriteAllInput = TypeOf<typeof getFavoriteAllSchema>["query"];
export type GetFavoriteOneInput = TypeOf<typeof getFavoriteOneSchema>["params"];
export type RemoveFavoriteOneInput = TypeOf<typeof removeFavoriteOneSchema>["body"];
