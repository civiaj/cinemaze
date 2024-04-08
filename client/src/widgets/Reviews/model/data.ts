import { ReviewSortT } from "./types";

export const reviewTypeOptions: OptionType<ReviewSortT, string>[] = [
    {
        value: "DATE_DESC",
        label: "details.reviews-new-first",
    },
    {
        value: "DATE_ASC",
        label: "details.reviews-old-first",
    },
];
