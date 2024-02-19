import { TypeOf, boolean, number, object, string } from "zod";

export const createFilmSchema = object({
    body: object({
        film: object({
            filmId: number(),
            nameRu: string().optional().nullish(),
            nameEn: string().optional().nullish(),
            nameOriginal: string().optional().nullish(),
            year: string().optional().nullish(),
            filmLength: string().optional().nullish(),
            countries: object({ genre: string().optional() }).array().optional().nullish(),
            genres: object({ genre: string().optional() }).array().optional().nullish(),
            rating: string().optional().nullish(),
            posterUrlPreview: string().optional().nullish(),
        }),
    }),
});

export type CreateFilmInput = TypeOf<typeof createFilmSchema>["body"];
