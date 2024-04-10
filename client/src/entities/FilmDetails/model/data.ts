import { ReviewSortT, GetFilmImagesType } from "./types";

export const reviewTypeOptions: OptionType<ReviewSortT, string>[] = [
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

export const tags: { title: string; type: GetFilmImagesType }[] = [
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
