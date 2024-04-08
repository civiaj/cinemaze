import { FavoriteListVariantT } from "./types";

export const listVariants: OptionType<FavoriteListVariantT, string>[] = [
    {
        label: "favorite.all",
        value: "all",
    },
    {
        label: "favorite.userscore",
        value: "userScore",
    },
    {
        label: "favoirite.will",
        value: "bookmarked",
    },
    {
        label: "favorite.hidden",
        value: "hidden",
    },
];
