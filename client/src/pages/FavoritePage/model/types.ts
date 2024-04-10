import { EntityState } from "@reduxjs/toolkit";
import { FavoriteListVariantT, TFavorite } from "@/entities/Favorite";

export interface FavoritePageSchema {
    listVariant: FavoriteListVariantT;
    favoritePageFilms: EntityState<FilmT & TFavorite>;
    page: number;
}
