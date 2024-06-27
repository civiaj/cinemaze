import toast from "react-hot-toast";
import { favoritePageActions } from "@/pages/FavoritePage";
import { api } from "@/shared/api/api";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { ServerMessageResponse } from "@/shared/api/types";
import getAddFavoriteToastMsg from "../helpers/getAddFavoriteToastMsg";
import getRemoveToastMsg from "../helpers/getRemoveToastMsg";
import {
    AddFavoriteReq,
    FavoriteItemT,
    FavoriteListVariantT,
    RemoveFavoriteRequest,
    SyncDataResponse,
    TFavorite,
    TStatistics,
} from "../model/types";

const userFilmsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addFavorite: builder.mutation<ServerMessageResponse, AddFavoriteReq>({
            query: (body) => ({
                url: "/favorite/add",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: "Favorite", id: arg.film.id }],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const {
                    film: { id },
                    favorite,
                } = arg;

                const patchResult = dispatch(
                    userFilmsApi.util.updateQueryData("getOneFavorite", id, (draft) => {
                        if (draft) Object.assign(draft, { id, ...favorite });
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
            query: (id) => ({
                url: `/favorite/info/${id}`,
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
                        body: { id },
                        listVariant,
                    } = arg;

                    toast.success(getRemoveToastMsg({ id, filmTitle, listVariant }), {
                        id: String(id),
                    });
                    dispatch(userFilmsApi.util.invalidateTags(["Favorites"]));
                    dispatch(favoritePageActions.removeFilm(id));
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
