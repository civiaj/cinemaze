import { authAndUserSliceActions } from "entities/AuthAndUser";
import { GenericResponse, LoginRequest, RegisterRequest } from "entities/Authorization/model/types";
import { userActions, userApi } from "entities/User";
import { serverApi } from "shared/api/serverApi";

const authApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<GenericResponse, RegisterRequest>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(authAndUserSliceActions.startLoading());
                    await queryFulfilled;
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate("withoutError"));
                    refetch();
                } catch (e) {
                    // errorMiddleware
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
        }),
        login: builder.mutation<GenericResponse, LoginRequest>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(authAndUserSliceActions.startLoading());
                    await queryFulfilled;
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate("withoutError"));
                    refetch();
                } catch (e) {
                    // errorMiddleware
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;

                    // RESET EVERYTHING AFTER LOGOUT
                    // When calling dispatch in other order there is infinite loading on useGetMeQuery hook, that shows fullscreen spinner. Can't understand why...

                    dispatch(userActions.logout());
                    dispatch(serverApi.util.resetApiState());
                } catch (e) {
                    // errorMiddleware
                }
            },
        }),
        checkPassword: builder.mutation<GenericResponse, LoginRequest>({
            query: (body) => ({
                url: "/checkPassword",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),
        forgotPassword: builder.mutation<{ message: string }, { email: string }>({
            query: (body) => ({ url: "/forgot", method: "POST", body, credentials: "include" }),
        }),
        resetPassword: builder.mutation<
            { message: string },
            { password: string; confirmPassword: string; resetToken: string }
        >({
            query: (payload) => {
                const { resetToken, ...body } = payload;

                return {
                    url: `/reset/${resetToken}`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useCheckPasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
