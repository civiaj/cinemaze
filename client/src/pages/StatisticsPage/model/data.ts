import { ScoreFilters, TLIntervals, VBFilters, VBSortBy } from "./types";

export const scoreTitles: Record<ScoreFilters, { title: string }> = {
    rating: { title: "stat.ratings-film" },
    userScore: { title: "stat.ratings-my" },
};

export const vbSortOptions: OptionType<VBSortBy, string>[] = [
    {
        label: "stat.cag-sort-count",
        value: "count",
    },
    {
        label: "stat.cag-sort-userscore",
        value: "avgUserScore",
    },
    {
        label: "stat.cag-sort-rating",
        value: "avgRating",
    },
];

export const vbFilters: OptionType<VBFilters, string>[] = [
    {
        label: "stat.cag-data-country",
        value: "countries",
    },
    {
        label: "stat.cag-data-genre",
        value: "genres",
    },
];

export const tlIntervals: OptionType<TLIntervals, string>[] = [
    {
        label: "stat.last-24",
        value: "1",
    },
    {
        label: "stat.last-7",
        value: "7",
    },
    {
        label: "stat.last-m",
        value: "30",
    },
    {
        label: "stat.last-y",
        value: "year",
    },
    {
        label: "stat.last-all",
        value: "all",
    },
];
