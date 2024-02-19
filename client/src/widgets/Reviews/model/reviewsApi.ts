import { GetReviewProps, ReviewQueryT } from "./types";
import { filmApi } from "shared/api/filmApi";

export const reviewApi = filmApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<ReviewQueryT, GetReviewProps>({
            query: ({ id, type, page }) => `/v2.2/films/${id}/reviews?page=${page}&order=${type}`,
        }),
    }),
    overrideExisting: false,
});
