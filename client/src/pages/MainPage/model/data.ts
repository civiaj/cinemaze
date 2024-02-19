import { MainQueryT } from "./types";

export const mainQueryOptions: OptionType<MainQueryT, string>[] = [
    { value: "TOP_100_POPULAR_FILMS", label: "Популярные" },
    { value: "TOP_250_BEST_FILMS", label: "Лучшие" },
    { value: "TOP_AWAIT_FILMS", label: "Ожидаемые" },
];

export const headerTitles: Record<MainQueryT, string> = {
    TOP_100_POPULAR_FILMS: "Смотрят сейчас",
    TOP_250_BEST_FILMS: "Топ всех времен",
    TOP_AWAIT_FILMS: "Скоро в кино",
};
