import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { Mutex } from "async-mutex";
import { userActions } from "entities/User";

const mutex = new Mutex();

// При запуске нетворк сервера vite нужно поменять baseUrl на '/api'.
// const baseUrl = `/api`;
const baseUrl = `${import.meta.env.VITE_SERVER_ENDPOINT as string}/api`;

const baseQuery = fetchBaseQuery({ baseUrl });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    { url: "refresh", credentials: "include" },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(userActions.logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const serverApi = createApi({
    reducerPath: "serverApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Favorites", "Session"],
    endpoints: () => ({}),
});
