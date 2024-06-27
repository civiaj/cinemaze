import toast from "react-hot-toast";
import { api } from "@/shared/api/api";
import { ServerMessageResponse } from "@/shared/api/types";
import i18n from "@/shared/i18n/config";
import {
    BlockUserRequest,
    GetAllUsersData,
    GetAllUsersQuery,
    GetAllUsersResponse,
    ManageUpdateOne,
    UnbanUserRequest,
} from "./types";

const manageApi = api.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getUsers: builder.query<GetAllUsersData, GetAllUsersQuery>({
            query: (params) => ({
                url: `/manage/users`,
                credentials: "include",
                params,
            }),
            transformResponse: (response: GetAllUsersResponse) => response.data,
            providesTags: ["Manage"],
        }),

        updateOne: builder.mutation<ServerMessageResponse, ManageUpdateOne>({
            query: (body) => ({
                url: "/manage/change",
                body,
                credentials: "include",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await toast.promise(queryFulfilled, {
                        loading: i18n.t("toast.update-user-loading"),
                        success: i18n.t("toast.update-user-success", { name: arg.displayName }),
                        error: i18n.t("toast.update-user-error"),
                    });
                    dispatch(manageApi.util.invalidateTags(["Manage"]));
                } catch (e) {
                    //error middleware
                }
            },
        }),
        banOne: builder.mutation<ServerMessageResponse, BlockUserRequest>({
            query: (body) => ({
                url: "/manage/ban",
                body,
                credentials: "include",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.ban-user-success", { name: arg.displayName }));

                    dispatch(manageApi.util.invalidateTags(["Manage"]));
                } catch (e) {
                    //error middleware
                }
            },
        }),
        unbanOne: builder.mutation<ServerMessageResponse, UnbanUserRequest>({
            query: ({ id }) => ({
                url: `/manage/unban/${id}`,
                credentials: "include",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.unban-user-success", { name: arg.displayName }));

                    dispatch(manageApi.util.invalidateTags(["Manage"]));
                } catch (e) {
                    //error middleware
                }
            },
        }),
    }),
});

export const { useGetUsersQuery, useUpdateOneMutation, useBanOneMutation, useUnbanOneMutation } =
    manageApi;
