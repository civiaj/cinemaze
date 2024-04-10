export interface ReviewT {
    kinopoiskId: number;
    type: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    date: string;
    positiveRating: number;
    negativeRating: number;
    author: string;
    title: string;
    description: string;
}

export interface ReviewQueryT {
    total: number;
    totalPages: number;
    totalPositiveReviews: number;
    totalNegativeReviews: number;
    totalNeutralReviews: number;
    items: ReviewT[];
}

const ReviewSort = {
    DATE_ASC: "DATE_ASC",
    DATE_DESC: "DATE_DESC",
    // некорректо отдает инф-у сервер
    // USER_POSITIVE_RATING_ASC: "USER_POSITIVE_RATING_ASC",
    // USER_POSITIVE_RATING_DESC: "USER_POSITIVE_RATING_DESC",
    // USER_NEGATIVE_RATING_ASC: "USER_NEGATIVE_RATING_ASC",
    // USER_NEGATIVE_RATING_DESC: "USER_NEGATIVE_RATING_DESC"
} as const;

export type ReviewSortT = ObjectValues<typeof ReviewSort>;

export type GetReviewProps = { id: number; type: ReviewSortT; page: number };

export type SimilarsT = {
    filmId: number;
    nameRu: string;
    posterUrlPreview: string;
};

export type SimilarsQueryT = {
    total: number;
    items: SimilarsT[];
};

export interface PersonT {
    kinopoiskId: number;
    webUrl: string;
    nameRu: string;
    nameEn: string;
    sex: string;
    posterUrl: string;
    growth: string | null;
    birthday: string | null;
    death: string | null;
    age: string | null;
    birthplace: string | null;
    deathplace: string | null;
    profession: string;
}

export interface FilmAwardsQueryItemT {
    name: string;
    win: boolean;
    imageUrl: string | null;
    nominationName: string;
    year: number;
    persons: PersonT[];
}

export interface FilmAwardsQueryT {
    total: number;
    items: FilmAwardsQueryItemT[];
}

export type FilmAwardsItemT = Omit<FilmAwardsQueryItemT, "name" | "win" | "imageUrl" | "year">;

export interface FilmAwardsItemListT
    extends Omit<FilmAwardsQueryItemT, "win" | "persons" | "nominationName"> {
    wins: FilmAwardsItemT[];
    nominates: FilmAwardsItemT[];
}

export interface FilmAwardsT {
    total: number;
    items: FilmAwardsItemListT[];
}

export const FilmImagesTypes = {
    STILL: "STILL",
    SHOOTING: "SHOOTING",
    POSTER: "POSTER",
    FAN_ART: "FAN_ART",
    PROMO: "PROMO",
    CONCEPT: "CONCEPT",
    WALLPAPER: "WALLPAPER",
    COVER: "COVER",
    SCREENSHOT: "SCREENSHOT",
} as const;

type ObjectValues<T> = T[keyof T];

export type GetFilmImagesType = ObjectValues<typeof FilmImagesTypes>;

export interface GetFilmImagesProps {
    id: number;
    type: GetFilmImagesType;
    page: number;
}

export interface FilmImagesT {
    imageUrl: string;
    previewUrl: string;
}

export interface GetFilmImagesResult {
    total: number;
    totalPages: number;
    items: FilmImagesT[];
}

export interface DetailsQueryT {
    kinopoiskId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    year: number;
    filmLength: number;
    countries: { country: string }[];
    genres: { genre: string }[];
    ratingKinopoisk: number;
    posterUrlPreview: string;
    posterUrl: string;
    reviewsCount: number;
    ratingKinopoiskVoteCount: number;
    ratingImdb: number;
    webUrl: string;
    slogan: string;
    ratingMpaa: string;
    ratingAgeLimits: string;
    ratingGoodReview: number;
    ratingGoodReviewVoteCount: number;
    ratingFilmCritics: number;
    ratingFilmCriticsVoteCount: number;
    description: string;
    shortDescription: string;
    ratingImdbVoteCount: number;
}

export interface DetailsT extends FilmT {
    posterUrl: string;
    reviewsCount: number;
    ratingImdb: number;
    link: string;
    slogan: string;
    ratingMpaa: string;
    ratingAgeLimits: string;
    ratingKinopoiskVoteCount: number;
    filmLengthMins?: string;
    filmLengthHours?: string;
    description: string;
}
