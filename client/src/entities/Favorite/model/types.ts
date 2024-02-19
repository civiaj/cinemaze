import { FavoriteListVariantT } from "pages/FavoritePage/model/types";

export type TFavorite = {
    bookmarked: boolean;
    userScore: number | null;
    hidden: boolean;
};

export type AddFavoriteRequest = {
    film: FilmT;
    favorite: Partial<TFavorite>;
};

export type RemoveFavoriteRequest = {
    body: { filmId: number; field: FavoriteListVariantT };
    listVariant: FavoriteListVariantT;
    filmTitle?: string;
};

export type SyncDataResponse = {
    films: ({
        filmId: number;
    } & TFavorite)[];
    hidden: number;
    userScore: number;
    bookmarked: number;
    all: number;
};

export type FavoriteItemT = { films: FilmT[]; totalPages: number };
