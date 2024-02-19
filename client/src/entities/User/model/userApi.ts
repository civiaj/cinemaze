import { authAndUserSliceActions } from "entities/AuthAndUser";
import { userActions } from "entities/User";
import { TUser } from "entities/User/model/types";
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
    }),
    overrideExisting: false,
});

export const { useGetMeQuery, useLazyGetMeQuery } = userApi;
