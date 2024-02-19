import { GetFilmImagesType } from "./types";

export const tags: { title: string; type: GetFilmImagesType }[] = [
    { type: "STILL", title: "Кадры" },
    { type: "SHOOTING", title: "Съёмки" },
    { type: "POSTER", title: "Постеры" },
    { type: "FAN_ART", title: "Фан-арт" },
    { type: "PROMO", title: "Промо" },
    { type: "CONCEPT", title: "Концепт" },
    { type: "WALLPAPER", title: "Обои" },
    { type: "COVER", title: "Обложки" },
    { type: "SCREENSHOT", title: "Скриншоты" },
];
