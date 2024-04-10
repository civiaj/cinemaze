import toast from "react-hot-toast";
import { favoritePageActions } from "@/pages/FavoritePage";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { serverApi } from "@/shared/api/serverApi";
import { ServerMessageResponse } from "@/shared/api/types";
import getAddFavoriteToastMsg from "../helpers/getAddFavoriteToastMsg";
import getRemoveToastMsg from "../helpers/getRemoveToastMsg";
import {
    AddFavoriteRequest,
    FavoriteItemT,
    FavoriteListVariantT,
    RemoveFavoriteRequest,
    SyncDataResponse,
    TFavorite,
    TStatistics,
} from "../model/types";

const userFilmsApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        addFavorite: builder.mutation<ServerMessageResponse, AddFavoriteRequest>({
            query: (body) => ({
                url: "/favorite/add",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Favorite", id: arg.film.filmId }],
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
                        error: (err) => {
                            return formatServerError(err.error);
                        },
                    });
                    dispatch(userFilmsApi.util.invalidateTags(["Favorites"]));
                } catch (e) {
                    patchResult.undo();
                    //error middleware
                }
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

            providesTags: () => ["Favorites"],
        }),
        getOneFavorite: builder.query<TFavorite | null, number>({
            query: (filmId) => ({
                url: `/favorite/info/${filmId}`,
                credentials: "include",
            }),
            transformResponse: (reponse: { data: TFavorite }) => reponse.data,
            providesTags: (_result, _error, arg) => [{ type: "Favorite", id: arg }],
        }),

        removeOneFavorite: builder.mutation<ServerMessageResponse, RemoveFavoriteRequest>({
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
                        body: { filmId },
                        listVariant,
                    } = arg;

                    toast.success(getRemoveToastMsg({ filmId, filmTitle, listVariant }), {
                        id: String(filmId),
                    });
                    dispatch(userFilmsApi.util.invalidateTags(["Favorites"]));
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
            providesTags: () => ["Favorites"],
        }),

        getStatistics: builder.query<TStatistics[], void>({
            query: () => ({
                url: "/favorite/statistics",
                credentials: "include",
            }),
            transformResponse: (response: { data: TStatistics[] }) => response.data,
            providesTags: () => ["Favorites"],
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
