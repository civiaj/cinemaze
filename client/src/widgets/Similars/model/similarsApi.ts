import { filmApi } from "@/shared/api/filmApi";
import { SimilarsQueryT } from "./types";

const similarsApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        similars: builder.query<SimilarsQueryT, number>({
            query: (id) => `/v2.2/films/${id}/similars`,
        }),
    }),
    overrideExisting: false,
});

export const { useSimilarsQuery } = similarsApi;
