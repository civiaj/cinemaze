import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "@/shared/const/const";
import {
    TImagesCategories,
    TReviewsSort,
    TSearchCategories,
    TSearchState,
    TTopCategories,
} from "./types";

export const reviewTypeOptions: OptionType<TReviewsSort, string>[] = [
    {
        value: "DATE_DESC",
        label: "details.reviews-new-first",
    },
    {
        value: "DATE_ASC",
        label: "details.reviews-old-first",
    },
];
export const similarsSliderSettings = {
    breakpoints: {
        1024: {
            slidesPerView: 6,
            slidesPerGroup: 5,
        },
        768: {
            slidesPerView: 4,
            slidesPerGroup: 3,
        },
        450: { slidesPerView: 3, slidesPerGroup: 2 },
        300: { slidesPerView: 2, slidesPerGroup: 1 },
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
    },
};
export const tags: { title: string; type: TImagesCategories }[] = [
    { type: "STILL", title: "details.tag-still" },
    { type: "SHOOTING", title: "details.tag-shooting" },
    { type: "POSTER", title: "details.tag-poster" },
    { type: "FAN_ART", title: "details.tag-fan-art" },
    { type: "PROMO", title: "details.tag-promo" },
    { type: "CONCEPT", title: "details.tag-concept" },
    { type: "WALLPAPER", title: "details.tag-wallpaper" },
    { type: "COVER", title: "details.tag-cover" },
    { type: "SCREENSHOT", title: "details.tag-screenshot" },
];
export const initialSearch: TSearchState = {
    country: null,
    genre: null,
    keyword: "",
    ratingFrom: RATING_FROM_MIN,
    ratingTo: RATING_TO_MAX,
    yearFrom: YEAR_FROM_MIN,
    yearTo: YEAR_TO_MAX,
};
export const orderOptions: OptionType<TSearchCategories, string>[] = [
    { value: "RATING", label: "search.by-rating" },
    { value: "NUM_VOTE", label: "search.by-count" },
    { value: "YEAR", label: "search.by-date" },
];
export const mainQueryOptions: OptionType<TTopCategories, string>[] = [
    { value: "TOP_100_POPULAR_FILMS", label: "main.popular" },
    { value: "TOP_250_BEST_FILMS", label: "main.best" },
    { value: "TOP_AWAIT_FILMS", label: "main.antisipated" },
];
export const headerTitles: Record<TTopCategories, string> = {
    TOP_100_POPULAR_FILMS: "main.popular-t",
    TOP_250_BEST_FILMS: "main.best-t",
    TOP_AWAIT_FILMS: "main.antisipated-t",
};
