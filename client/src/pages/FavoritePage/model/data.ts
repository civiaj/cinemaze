import { FavoriteListVariantT } from "@/entities/Favorite";

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
        label: "favorite.will",
        value: "bookmarked",
    },
    {
        label: "favorite.hidden",
        value: "hidden",
    },
];
