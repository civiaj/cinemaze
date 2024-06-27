import { EntityState } from "@reduxjs/toolkit";
import { FavoriteListVariantT, TFavorite } from "@/entities/Favorite";
import { TFilm } from "@/entities/Film";

export interface FavoritePageSchema {
    listVariant: FavoriteListVariantT;
    films: EntityState<TFilm & TFavorite>;
    page: number;
}
