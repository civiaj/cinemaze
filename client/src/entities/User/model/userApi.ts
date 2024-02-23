import { authAndUserSliceActions } from "entities/AuthAndUser";
import { userActions } from "entities/User";
import { TUser } from "entities/User/model/types";
import toast from "react-hot-toast";
import { serverApi } from "shared/api/serverApi";

export const userApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<TUser, void | "withoutError">({
            query: () => ({
                url: "users/me",
                credentials: "include",
            }),

            transformResponse: (response: { data: TUser }) => response.data,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userActions.setUser(data));
                } catch (e) {
                    // error middleware
                } finally {
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },

            transformErrorResponse(response, _, arg) {
                if (arg === "withoutError") {
                    response.data = "withoutError";
                }
                return response;
            },
        }),
        updateDisplayName: builder.mutation<{ message: string }, { displayName: string }>({
            query: (body) => ({
                url: "user/update/displayName",
                credentials: "include",
                body,
                method: "PATCH",
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    toast.success(`Имя обновлено`);
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate("withoutError"));
                    refetch();
                } catch (e) {
                    //error middleware
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetMeQuery, useLazyGetMeQuery, useUpdateDisplayNameMutation } = userApi;
