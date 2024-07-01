import { EntityState } from "@reduxjs/toolkit";
import { TFavorites, TFavoritesListVariants, TFilm } from "@/entities/Film";

export interface FavoritePageSchema {
    listVariant: TFavoritesListVariants;
    films: EntityState<TFilm & TFavorites>;
    page: number;
}
