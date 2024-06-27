export const formatMinutes = (minutes: number | null) => {
    if (!minutes) return null;
    let hours: number | string = Math.floor(minutes / 60);
    let min: number | string = minutes % 60;

    if (hours === 0) hours = "00";
    else if (hours < 10) hours = `0${hours}`;

    if (min === 0) min = "00";
    else if (min < 10) min = `0${min}`;

    return `${hours}:${min}`;
};

export const formatHours = (timestamp: string | null) => {
    if (!timestamp) return null;
    const time = timestamp.split(":").map(Number);
    if (time.every((val) => isNaN(val))) return null;
    const [hours, minutes] = time;
    return hours * 60 + minutes;
};
