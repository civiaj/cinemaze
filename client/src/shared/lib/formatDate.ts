export const formatDate = (
    date: Date | number,
    locales: string | string[],
    options: Intl.DateTimeFormatOptions = {
        month: "2-digit",
        year: "numeric",
        day: "numeric",
    }
) => {
    return new Intl.DateTimeFormat(locales, options).format(date);
};
