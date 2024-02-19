import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy в kk:mm", { locale: ru });
};
