import toast from "react-hot-toast";
import { serverApi } from "shared/api/serverApi";

import getAddFavoriteToastMsg from "pages/FavoritePage/helpers/getAddFavoriteToastMsg";
import getRemoveToastMsg from "pages/FavoritePage/helpers/getRemoveToastMsg";
import { favoritePageActions } from "pages/FavoritePage/model/slice";
import { FavoriteListVariantT } from "pages/FavoritePage/model/types";
import {
    AddFavoriteRequest,
    FavoriteItemT,
    RemoveFavoriteRequest,
    SyncDataResponse,
    TFavorite,
    TStatistics,
} from "../model/types";

const userFilmsApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        addFavorite: builder.mutation<{ message: string }, AddFavoriteRequest>({
            query: (body) => ({
                url: "/favorite/add",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const {
                    film: { filmId },
                    favorite,
                } = arg;

                const patchResult = dispatch(
                    userFilmsApi.util.updateQueryData("getOneFavorite", filmId, (draft) => {
                        if (draft) Object.assign(draft, { filmId, ...favorite });
                    })
                );

                try {
                    await toast.promise(queryFulfilled, {
                        loading: getAddFavoriteToastMsg(favorite),
                        success: getAddFavoriteToastMsg(favorite),
                        error: `Ошибка во время выполнения запроса`,
                    });
                } catch (e) {
                    patchResult.undo();
                    //error middleware
                }
            },
            transformErrorResponse: (response) => {
                response.data = "withoutError";
                return response;
            },
        }),
        getAllFavorite: builder.query<
            FavoriteItemT,
            { page: number; filter: FavoriteListVariantT }
        >({
            query: ({ page, filter }) => ({
                url: `/favorite?page=${page}&filter=${filter}`,
                credentials: "include",
            }),
            transformResponse: (response: { data: FavoriteItemT }) => response.data,

            providesTags: ["Favorites"],
        }),
        getOneFavorite: builder.query<TFavorite | null, number>({
            query: (filmId) => ({
                url: `/favorite/info/${filmId}`,
                credentials: "include",
            }),
            transformResponse: (reponse: { data: TFavorite }) => reponse.data,
            providesTags: (_result, _error, arg) => [{ type: "Favorites", id: arg }],
        }),

        removeOneFavorite: builder.mutation<{ message: string }, RemoveFavoriteRequest>({
            query: (payload) => ({
                url: "favorite/remove",
                method: "POST",
                body: payload.body,
                credentials: "include",
            }),
            invalidatesTags: ["Favorites"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    const {
                        filmTitle,
                        body: { filmId },
                        listVariant,
                    } = arg;

                    toast.success(getRemoveToastMsg({ filmId, filmTitle, listVariant }), {
                        id: String(filmId),
                    });
                    dispatch(favoritePageActions.removeFilm(filmId));
                } catch (e) {
                    // error middleware
                }
            },
        }),

        getSyncData: builder.query<SyncDataResponse, void>({
            query: () => ({
                url: "/favorite/sync",
                credentials: "include",
            }),
            transformResponse: (response: { data: SyncDataResponse }) => response.data,
            providesTags: ["Favorites"],
        }),
        getStatistics: builder.query<TStatistics[], void>({
            query: () => ({
                url: "/favorite/statistics",
                credentials: "include",
            }),
            transformResponse: (response: { data: TStatistics[] }) => response.data,
            providesTags: ["Favorites"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetOneFavoriteQuery,
    useGetAllFavoriteQuery,
    useAddFavoriteMutation,
    useLazyGetOneFavoriteQuery,
    useGetSyncDataQuery,
    useRemoveOneFavoriteMutation,
    useGetStatisticsQuery,
} = userFilmsApi;
