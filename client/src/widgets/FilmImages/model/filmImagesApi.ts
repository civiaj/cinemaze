import { filmApi } from "@/shared/api/filmApi";
import { GetFilmImagesProps, GetFilmImagesResult } from "./types";

const filmImagesApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilmImages: builder.query<GetFilmImagesResult, GetFilmImagesProps>({
            query: ({ id, type, page }) => `v2.2/films/${id}/images?type=${type}&page=${page}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetFilmImagesQuery } = filmImagesApi;
