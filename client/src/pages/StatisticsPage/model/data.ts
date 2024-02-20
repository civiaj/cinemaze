import { ScoreFilters, TLIntervals, VBFilters, VBSortBy } from "./types";

export const scoreTitles: Record<ScoreFilters, { title: string }> = {
    rating: { title: "rating" },
    userScore: { title: "userScore" },
};

export const vbSortOptions: OptionType<VBSortBy, string>[] = [
    {
        label: "Name",
        value: "name",
    },
    {
        label: "Count",
        value: "count",
    },
    {
        label: "AvgUserScore",
        value: "avgUserScore",
    },
    {
        label: "AvgRating",
        value: "avgRating",
    },
];

export const vbFilters: OptionType<VBFilters, string>[] = [
    {
        label: "Countries",
        value: "countries",
    },
    {
        label: "Genres",
        value: "genres",
    },
];

export const tlIntervals: OptionType<TLIntervals, string>[] = [
    {
        label: "24 hours",
        value: "1",
    },
    {
        label: "Week",
        value: "7",
    },
    {
        label: "Month",
        value: "30",
    },
    {
        label: "Year",
        value: "year",
    },
    {
        label: "All time",
        value: "all",
    },
];
