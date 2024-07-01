export { FilmAwards } from "./ui/Awards/FilmAwards";
export { FilmImages } from "./ui/Gallery/FilmImages";
export { Reviews } from "./ui/Reviews/Reviews";
export { Similars } from "./ui/Similars";
export { useDetailsQuery } from "./model/filmApi";
export { Description } from "./ui/Description";
export * from "./model/filmApi";
export type {
    TFilm,
    TTopCategories,
    TFiltersRes,
    TSearchState,
    TSearchCategories,
    TSearchRes,
    TDetails,
    TImages,
    TStatistics,
    TFavorites,
    TFavoritesListVariants,
    UpdateFavorite,
} from "./model/types";
export { headerTitles, mainQueryOptions, orderOptions } from "./model/data";
