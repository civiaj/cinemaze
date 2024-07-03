import toast from "react-hot-toast";
import { api } from "@/shared/api/api";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { ServerMessageResponse } from "@/shared/api/types";
import { filmActions } from "./slice";
import {
    TAwardsRes,
    TDetails,
    TFavorites,
    TFavoritesAllReq,
    TFavoritesAllRes,
    TFavoritesRemoveReq,
    TFavoritesTotal,
    TFilm,
    TFiltersRes,
    TImagesReq,
    TImagesRes,
    TReviewsReq,
    TReviewsRes,
    TSearchReq,
    TSearchRes,
    TSimilarsRes,
    TStatistics,
    TTopReq,
    TTopRes,
} from "./types";
import { getAddFavoriteToastMsg, getRemoveToastMsg, transformPayload } from "./utils";

export const filmApi = api.injectEndpoints({
    endpoints: (builder) => ({
        top: builder.query<TTopRes, TTopReq>({
            query: ({ mainQuery, page }) => ({
                url: `/films/top?type=${mainQuery}&page=${page}`,
                credentials: "include",
            }),
            providesTags: ["Favorites"],
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
            query: (id) => ({
                url: `/films/details/${id}`,
                credentials: "include",
            }),
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
        addOne: builder.mutation<ServerMessageResponse, TFilm & { key: keyof TFavorites }>({
            query: (body) => ({
                url: "/favorite/add",
                method: "POST",
                body,
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { favorite, id, key } = arg;

                const patchResult = dispatch(
                    filmApi.util.updateQueryData("details", id, (draft) => {
                        if (draft) Object.assign(draft, { id, favorite: { ...favorite } });
                    })
                );

                try {
                    await toast.promise(queryFulfilled, {
                        loading: getAddFavoriteToastMsg(favorite!, key),
                        success: getAddFavoriteToastMsg(favorite!, key),
                        error: (err) => {
                            return formatServerError(err.error);
                        },
                    });
                    const { bookmarked, hidden, userScore } = favorite ?? {};
                    if ([bookmarked, hidden, userScore].every((v) => !v)) {
                        dispatch(filmActions.removeFilm(id));
                    } else {
                        dispatch(filmActions.updateFilm({ id, changes: { favorite } }));
                    }
                } catch (e) {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["Favorites"],
        }),
        getFavorites: builder.query<TFavoritesAllRes, TFavoritesAllReq>({
            query: (params) => ({ url: `/favorite`, credentials: "include", params }),
            providesTags: ["Favorites"],
        }),

        removeOneFavorite: builder.mutation<ServerMessageResponse, TFavoritesRemoveReq>({
            query: (payload) => ({
                url: "favorite/remove",
                method: "POST",
                body: payload.body,
                credentials: "include",
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    const {
                        filmTitle,
                        body: { id, field },
                    } = arg;

                    toast.success(getRemoveToastMsg({ id, filmTitle, listVariant: field }), {
                        id: String(id),
                    });
                    dispatch(filmActions.removeFilm(id));
                } catch (e) {
                    // error middleware
                }
            },
            invalidatesTags: ["Favorites"],
        }),
        getStatsTotal: builder.query<TFavoritesTotal, void>({
            query: () => ({
                url: "/favorite/stats/total",
                credentials: "include",
            }),
            providesTags: () => ["Favorites"],
        }),

        getStats: builder.query<TStatistics[], void>({
            query: () => ({
                url: "/favorite/stats",
                credentials: "include",
            }),
            providesTags: () => ["Favorites"],
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
    useGetFavoritesQuery,
    useGetStatsQuery,
    useGetStatsTotalQuery,
    useRemoveOneFavoriteMutation,
    useAddOneMutation,
} = filmApi;
