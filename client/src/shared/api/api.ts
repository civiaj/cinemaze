import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
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
                    api.dispatch({ type: "userSlice/logout" });
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

export const api = createApi({
    reducerPath: "server",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Favorites", "Session", "Manage"],
    endpoints: () => ({}),
});
