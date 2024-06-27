import { TFilm } from "@/entities/Film";

export type TFavorite = {
    bookmarked?: boolean | null;
    userScore?: number | null;
    hidden?: boolean | null;
};

export type AddFavoriteReq = {
    film: TFilm;
    favorite: TFavorite;
};

export type RemoveFavoriteRequest = {
    body: { id: number; field: FavoriteListVariantT };
    listVariant: FavoriteListVariantT;
    filmTitle?: string;
};

export type SyncDataResponse = {
    films: ({
        id: number;
    } & TFavorite)[];
    hidden: number;
    userScore: number;
    bookmarked: number;
    all: number;
};

export type TStatistics = {
    id: number;
    genres: string[];
    countries: string[];
    userScore: number | null;
    bookmarked: boolean;
    hidden: boolean;
    updatedAt: string;
    rating?: string;
    nameRu?: string;
    year?: string;
};

export type FavoriteItemT = { films: TFilm[]; totalPages: number };

export const favoriteListVariant = {
    all: "all",
    bookmarked: "bookmarked",
    hidden: "hidden",
    userScore: "userScore",
} as const;

export type FavoriteListVariantT = ObjectValues<typeof favoriteListVariant>;
