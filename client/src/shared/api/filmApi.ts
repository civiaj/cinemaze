import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filmApi = createApi({
    reducerPath: "filmApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://kinopoiskapiunofficial.tech/api/",
        prepareHeaders: (headers) => {
            headers.set("X-API-KEY", import.meta.env.VITE_KP_UNOFF_KEY);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    keepUnusedDataFor: 666,
    endpoints: () => ({}),
});
