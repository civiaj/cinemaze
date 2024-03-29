import {
    BlockUserRequest,
    GetAllUsersData,
    GetAllUsersQuery,
    GetAllUsersResponse,
    ManageUpdateOne,
} from "pages/ManagePage/model/types";
import toast from "react-hot-toast";
import { serverApi } from "shared/api/serverApi";
import { ServerMessageResponse } from "shared/api/types";

const manageApi = serverApi.injectEndpoints({
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
                        loading: "Обновление пользователя...",
                        success: `Пользователь ${arg.displayName} успешно обновлен`,
                        error: `Ошибка во время выполнения запроса`,
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
                    await toast.promise(queryFulfilled, {
                        loading: "Обновление пользователя...",
                        success: `Пользователь ${arg.displayName} успешно заблокирован`,
                        error: `Ошибка во время выполнения запроса`,
                    });
                    dispatch(manageApi.util.invalidateTags(["Manage"]));
                } catch (e) {
                    //error middleware
                }
            },
        }),
    }),
});

export const { useGetUsersQuery, useUpdateOneMutation, useBanOneMutation } = manageApi;
