import { ReviewSortT } from "./types";

export const reviewTypeOptions: OptionType<ReviewSortT, string>[] = [
    {
        value: "DATE_DESC",
        label: "Сначала новые",
    },
    {
        value: "DATE_ASC",
        label: "Сначала старые",
    },
];
