import { filmApi } from "shared/api/filmApi";
import { FilmDataT, FilmsQueryT, MainQueryT } from "./types";

type FilmsProps = { mainQuery: MainQueryT; page: number };

const mainPageApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        films: builder.query<FilmDataT, FilmsProps>({
            query: ({ mainQuery, page }) => `/v2.2/films/top?type=${mainQuery}&page=${page}`,

            transformResponse: (response: FilmsQueryT) => {
                return {
                    ...response,
                    totalPages: response.pagesCount,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useFilmsQuery } = mainPageApi;
