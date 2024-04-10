import { EntityState } from "@reduxjs/toolkit";
import { TFavorite } from "@/entities/Favorite";

export const favoriteListVariant = {
    all: "all",
    bookmarked: "bookmarked",
    hidden: "hidden",
    userScore: "userScore",
} as const;

export type FavoriteListVariantT = ObjectValues<typeof favoriteListVariant>;

export interface FavoritePageSchema {
    listVariant: FavoriteListVariantT;
    favoritePageFilms: EntityState<FilmT & TFavorite>;
    page: number;
}
