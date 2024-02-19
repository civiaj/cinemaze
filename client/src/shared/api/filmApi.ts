import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../const/const";

export const filmApi = createApi({
    reducerPath: "filmApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://kinopoiskapiunofficial.tech/api/",
        prepareHeaders: (headers) => {
            headers.set("X-API-KEY", API_KEY);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    keepUnusedDataFor: 666,
    endpoints: () => ({}),
});
