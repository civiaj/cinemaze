import toast from "react-hot-toast";
import { favoritePageActions } from "@/pages/FavoritePage";
import { api } from "@/shared/api/api";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { ServerMessageResponse } from "@/shared/api/types";
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

const filmApi = api.injectEndpoints({
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
            providesTags: ["Favorites"],
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
            invalidatesTags: ["Favorites"],
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
                    dispatch(filmApi.util.invalidateTags(["Favorites"]));
                } catch (e) {
                    patchResult.undo();
                }
            },
        }),
        getAll: builder.query<TFavoritesAllRes, TFavoritesAllReq>({
            query: (params) => ({
                url: `/favorite`,
                params,
                credentials: "include",
            }),
            providesTags: () => ["Favorites"],
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
                    dispatch(filmApi.util.invalidateTags(["Favorites"]));
                    dispatch(favoritePageActions.removeFilm(id));
                } catch (e) {
                    // error middleware
                }
            },
        }),
        getStatsTotal: builder.query<TFavoritesTotal, void>({
            query: () => ({
                url: "/favorite/sync",
                credentials: "include",
            }),
            providesTags: () => ["Favorites"],
        }),

        getStats: builder.query<TStatistics[], void>({
            query: () => ({
                url: "/favorite/statistics",
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
    useGetAllQuery,
    useGetStatsQuery,
    useGetStatsTotalQuery,
    useRemoveOneFavoriteMutation,
    useAddOneMutation,
} = filmApi;
