import { TypeOf, number, object, string } from "zod";

export const createFilmSchema = object({
    body: object({
        film: object({
            id: number(),
            nameRu: string().optional().nullish(),
            nameEn: string().optional().nullish(),
            nameOriginal: string().optional().nullish(),
            year: number().optional().nullish(),
            filmLengthMins: number().optional().nullish(),
            filmLengthHours: string().optional().nullish(),
            countries: object({ genre: string().optional() }).array().optional().nullish(),
            genres: object({ genre: string().optional() }).array().optional().nullish(),
            rating: number().optional().nullish(),
            posterUrlPreview: string().optional().nullish(),
        }),
    }),
});

export type CreateFilmInput = TypeOf<typeof createFilmSchema>["body"];
