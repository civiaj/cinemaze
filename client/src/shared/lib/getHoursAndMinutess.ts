import { EMPTY_LINE } from "shared/const/const";

export const getHoursAndMinutess = (minutes?: number) => {
    if (!minutes) return EMPTY_LINE;
    let hours: number | string = Math.floor(minutes / 60);
    let min: number | string = minutes % 60;

    if (hours === 0) hours = "00";
    else if (hours < 10) hours = `0${hours}`;

    if (min === 0) min = "00";
    else if (min < 10) min = `0${min}`;

    return `${hours}:${min}`;
};
