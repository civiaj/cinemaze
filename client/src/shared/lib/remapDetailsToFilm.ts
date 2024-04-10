import { DetailsT } from "@/pages/DetailsPage/model/types";
import { getHoursAndMinutess } from "@/shared/lib/getHoursAndMinutess";

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
        filmLength: getHoursAndMinutess(Number(filmLength)),
        countries,
        genres,
        rating,
        posterUrlPreview,
    };
};
