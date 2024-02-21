import { FavoriteListVariantT } from "./types";

export const listVariants: OptionType<FavoriteListVariantT, string>[] = [
    {
        label: "q-all",
        value: "all",
    },
    {
        label: "q-user",
        value: "userScore",
    },
    {
        label: "q-will",
        value: "bookmarked",
    },
    {
        label: "q-hidden",
        value: "hidden",
    },
];
