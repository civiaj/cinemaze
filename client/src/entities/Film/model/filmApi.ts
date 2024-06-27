import { api } from "@/shared/api/api";
import {
    TAwardsRes,
    TDetails,
    TFiltersRes,
    TImagesReq,
    TImagesRes,
    TReviewsReq,
    TReviewsRes,
    TSearchReq,
    TSearchRes,
    TSimilarsRes,
    TTopReq,
    TTopRes,
} from "./types";
import { transformPayload } from "./utils";

const filmApi = api.injectEndpoints({
    endpoints: (builder) => ({
        top: builder.query<TTopRes, TTopReq>({
            query: ({ mainQuery, page }) => `/films/top?type=${mainQuery}&page=${page}`,
        }),
        reviews: builder.query<TReviewsRes, TReviewsReq>({
            query: (params) => ({
                url: "/films/reviews",
                params,
            }),
        }),
        similars: builder.query<TSimilarsRes, number | string>({
            query: (id) => `/films/similars/${id}`,
        }),
        awards: builder.query<TAwardsRes, number | string>({
            query: (id) => `/films/awards/${id}`,
        }),
        images: builder.query<TImagesRes, TImagesReq>({
            query: (params) => ({
                url: "/films/images",
                params,
            }),
        }),
        details: builder.query<TDetails, number>({
            query: (id) => `/films/details/${id}`,
        }),
        filters: builder.query<TFiltersRes, void>({
            query: () => `/films/filters`,
        }),
        search: builder.query<TSearchRes, Partial<TSearchReq>>({
            query: (payload) => {
                const params = transformPayload(payload);
                return { url: "/films/search", params };
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useReviewsQuery,
    useSimilarsQuery,
    useAwardsQuery,
    useImagesQuery,
    useDetailsQuery,
    useLazyDetailsQuery,
    useTopQuery,
    useSearchQuery,
    useFiltersQuery,
} = filmApi;
