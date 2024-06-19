import { SearchOrderT } from "../model/types";

export const orderOptions: OptionType<SearchOrderT, string>[] = [
    { value: "RATING", label: "search.by-rating" },
    { value: "NUM_VOTE", label: "search.by-count" },
    { value: "YEAR", label: "search.by-date" },
];

export const extraHeight = 56 + (window.innerHeight / 100) * 10; //3.5rem + 10%
