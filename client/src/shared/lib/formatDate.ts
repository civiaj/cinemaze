export const formatDate = (
    date: Date | number,
    locales: string | string[],
    options: Intl.DateTimeFormatOptions | "long" | "short" = {
        month: "2-digit",
        year: "numeric",
        day: "numeric",
    }
) => {
    let dateOptions: Intl.DateTimeFormatOptions;
    if (options === "long")
        dateOptions = {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
    else if (options === "short")
        dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
    else dateOptions = options;

    return new Intl.DateTimeFormat(locales, dateOptions).format(date);
};
