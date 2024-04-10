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

export type TStatistics = {
    filmId: number;
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

export type FavoriteItemT = { films: FilmT[]; totalPages: number };

export const favoriteListVariant = {
    all: "all",
    bookmarked: "bookmarked",
    hidden: "hidden",
    userScore: "userScore",
} as const;

export type FavoriteListVariantT = ObjectValues<typeof favoriteListVariant>;
