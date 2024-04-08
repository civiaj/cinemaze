import { MainQueryT } from "./types";

export const mainQueryOptions: OptionType<MainQueryT, string>[] = [
    { value: "TOP_100_POPULAR_FILMS", label: "main.popular" },
    { value: "TOP_250_BEST_FILMS", label: "main.best" },
    { value: "TOP_AWAIT_FILMS", label: "main.antisipated" },
];

export const headerTitles: Record<MainQueryT, string> = {
    TOP_100_POPULAR_FILMS: "main.popular-t",
    TOP_250_BEST_FILMS: "main.best-t",
    TOP_AWAIT_FILMS: "main.antisipated-t",
};
