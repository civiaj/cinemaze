import { authAndUserSliceActions } from "entities/AuthAndUser";
import {
    GenericResponse,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
} from "entities/Authorization/model/types";
import { userActions, userApi } from "entities/User";
import { serverApi } from "shared/api/serverApi";

const authApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TokenResponse, RegisterRequest>({
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
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    // errorMiddleware
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
        }),
        login: builder.mutation<TokenResponse, LoginRequest>({
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
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
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
                    dispatch(userActions.logout());
                } catch (e) {
                    // errorMiddleware
                }
            },
        }),
        verifyEmail: builder.mutation<GenericResponse, string>({
            query: (verificationCode) => ({ url: `/activate/${verificationCode}` }),
        }),
    }),
    overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useVerifyEmailMutation } =
    authApi;
