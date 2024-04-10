import toast from "react-hot-toast";
import { authAndUserSliceActions } from "@/features/LoadingAuthorizationAndUser";
import { userActions } from "@/entities/User";
import { serverApi } from "@/shared/api/serverApi";
import { ServerMessageResponse } from "@/shared/api/types";
import i18n from "@/shared/i18n/config";
import { SessionsResponse, TRoles, TUser } from "../model/types";

export const userApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<TUser, void>({
            query: () => ({
                url: "user/me",
                credentials: "include",
            }),

            transformResponse: (response: { data: TUser }) => response.data,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userActions.setUser(data));
                } catch (e) {
                    dispatch(userActions.removeUser());
                    // error middleware
                } finally {
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
        }),
        getSessions: builder.query<SessionsResponse, void>({
            query: () => ({
                url: "/user/sessions",
                credentials: "include",
            }),
            transformResponse: (response: { data: SessionsResponse }) => response.data,
            providesTags: ["Session"],
        }),
        updateDisplayName: builder.mutation<ServerMessageResponse, { displayName: string }>({
            query: (body) => ({
                url: "user/update/displayName",
                credentials: "include",
                body,
                method: "PATCH",
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-name"));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
            invalidatesTags: ["Manage"],
        }),
        updatePassword: builder.mutation<
            ServerMessageResponse,
            { password: string; confirmPassword: string }
        >({
            query: (body) => ({
                url: "/user/update/password",
                credentials: "include",
                body,
                method: "PATCH",
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-password"));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
        }),
        updatePhoto: builder.mutation<ServerMessageResponse, FormData>({
            query: (formData) => ({
                url: "user/update/photo",
                credentials: "include",
                body: formData,
                method: "PATCH",
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-photo"));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
            invalidatesTags: ["Manage"],
        }),

        deletePhoto: builder.mutation<ServerMessageResponse, void>({
            query: () => ({
                url: "user/remove/photo",
                credentials: "include",
                method: "PATCH",
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-photo-delete"));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
            invalidatesTags: ["Manage"],
        }),

        removeSession: builder.mutation<ServerMessageResponse, { session: string }>({
            query: (body) => ({
                url: "user/sessions",
                method: "DELETE",
                credentials: "include",
                body,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-session"));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
            invalidatesTags: ["Session"],
        }),

        updateRole: builder.mutation<ServerMessageResponse, TRoles>({
            query: (newRole) => ({
                url: "/user/update/role",
                method: "PATCH",
                credentials: "include",
                body: { role: newRole },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(i18n.t("toast.update-role", { role: arg }));
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMeQuery,
    useLazyGetMeQuery,
    useUpdateDisplayNameMutation,
    useGetSessionsQuery,
    useRemoveSessionMutation,
    useUpdatePasswordMutation,
    useUpdatePhotoMutation,
    useDeletePhotoMutation,
    useUpdateRoleMutation,
} = userApi;
