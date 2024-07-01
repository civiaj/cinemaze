import { TFavoritesListVariants } from "@/entities/Film";

export const listVariants: OptionType<TFavoritesListVariants, string>[] = [
    {
        label: "favorite.all",
        value: "all",
    },
    {
        label: "favorite.userscore",
        value: "userScore",
    },
    {
        label: "favorite.will",
        value: "bookmarked",
    },
    {
        label: "favorite.hidden",
        value: "hidden",
    },
];
