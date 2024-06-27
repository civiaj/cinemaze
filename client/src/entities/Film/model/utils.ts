import { TSearchReq } from "@/entities/Film/model/types";
import { initialSearch } from "./data";

export const transformPayload = (payload: Partial<TSearchReq>): TSearchReq => {
    const {
        country = initialSearch.country,
        genre = initialSearch.genre,
        keyword = "",
        order = "NUM_VOTE",
        page = 1,
        ratingFrom = initialSearch.ratingFrom,
        ratingTo = initialSearch.ratingTo,
        yearFrom = initialSearch.ratingFrom,
        yearTo = initialSearch.yearTo,
    } = payload;

    return { country, genre, keyword, order, page, ratingFrom, ratingTo, yearFrom, yearTo };
};
