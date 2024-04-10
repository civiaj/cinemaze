import { DetailsT } from "@/entities/FilmDetails";
import { getHoursAndMinutes } from "@/shared/lib/getHoursAndMinutes";

export default (dataItem: DetailsT): FilmT => {
    const {
        filmId,
        nameRu,
        nameEn,
        nameOriginal,
        year,
        filmLength,
        countries,
        genres,
        rating,
        posterUrlPreview,
    } = dataItem;

    return {
        filmId,
        nameRu,
        nameEn,
        nameOriginal,
        year,
        filmLength: getHoursAndMinutes(Number(filmLength)),
        countries,
        genres,
        rating,
        posterUrlPreview,
    };
};
