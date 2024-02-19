import { filmApi } from "shared/api/filmApi";

import { FilmAwardsItemListT, FilmAwardsQueryT, FilmAwardsT } from "./types";

const filmAwardsApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
    overrideExisting: false,
});

export const { useGetFilmAwardsQuery } = filmAwardsApi;
