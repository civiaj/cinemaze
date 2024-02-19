import { EMPTY_LINE } from "shared/const/const";

export const numberWithSpaces = (num: number | undefined) => {
    if (!num) return EMPTY_LINE;
    return new Intl.NumberFormat("ru", { useGrouping: true }).format(num);
};
