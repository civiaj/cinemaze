import { DetailsT } from "pages/DetailsPage/model/types";
import { EMPTY_LINE } from "shared/const/const";
import { TLngs } from "shared/i18n/types";

export const getFilmTitle = (film: FilmT | DetailsT | null | undefined, locale: TLngs): string => {
    if (!film) return EMPTY_LINE;
    const { nameRu, nameEn, nameOriginal } = film;
    if (locale === "ru") return nameRu ?? nameEn ?? nameOriginal ?? EMPTY_LINE;
    return nameEn ?? nameOriginal ?? nameRu ?? EMPTY_LINE;
};
