import { MainQueryT } from "./types";

export const mainQueryOptions: OptionType<MainQueryT, string>[] = [
    { value: "TOP_100_POPULAR_FILMS", label: "mq-popular" },
    { value: "TOP_250_BEST_FILMS", label: "mq-best" },
    { value: "TOP_AWAIT_FILMS", label: "mq-antisipated" },
];

export const headerTitles: Record<MainQueryT, string> = {
    TOP_100_POPULAR_FILMS: "mq-popular-h",
    TOP_250_BEST_FILMS: "mq-best-h",
    TOP_AWAIT_FILMS: "mq-antisipated-h",
};
