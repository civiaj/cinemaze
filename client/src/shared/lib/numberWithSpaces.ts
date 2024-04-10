import { EMPTY_LINE } from "@/shared/const/const";
import i18n from "@/shared/i18n/config";

export const numberWithSpaces = (num: number | undefined) => {
    if (!num) return EMPTY_LINE;
    return new Intl.NumberFormat(i18n.language, { useGrouping: true }).format(num);
};
