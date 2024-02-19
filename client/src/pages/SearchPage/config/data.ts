import { SearchOrderT } from "../model/types";

export const orderOptions: OptionType<SearchOrderT, string>[] = [
    { value: "RATING", label: "По рейтингу" },
    { value: "NUM_VOTE", label: "По количеству оценок" },
    { value: "YEAR", label: "По дате выхода" },
];
