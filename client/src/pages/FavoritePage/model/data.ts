import { FavoriteListVariantT } from "./types";

export const listVariants: OptionType<FavoriteListVariantT, string>[] = [
    {
        label: "Все",
        value: "all",
    },
    {
        label: "С моей оценкой",
        value: "userScore",
    },
    {
        label: "Буду смотреть",
        value: "bookmarked",
    },
    {
        label: "Скрытые",
        value: "hidden",
    },
];
