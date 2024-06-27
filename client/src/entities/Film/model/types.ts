type CountriesEntity = {
    country: string;
};
type GenresEntity = {
    genre: string;
};

export type TFilm = {
    id: number;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    year: number | null;
    filmLengthMins: number | null;
    filmLengthHours: string | null;
    countries: CountriesEntity[] | null;
    genres: GenresEntity[] | null;
    rating: number | null;
    posterUrlPreview: string | null;
};
export type TDetails = {
    posterUrl: string | null;
    reviewsCount: number | null;
    ratingImdb: number | null;
    webUrl: string | null;
    slogan: string | null;
    ratingMpaa: string | null;
    ratingAgeLimits: string | null;
    ratingKinopoiskVoteCount: number | null;
    description: string | null;
} & TFilm;
export type TSimilars = Pick<
    TFilm,
    "id" | "nameRu" | "nameEn" | "nameOriginal" | "posterUrlPreview"
>;
export type TPerson = {
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
    profession: string | null;
};
export type TReviews = {
    kinopoiskId: number;
    type: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    date: string;
    positiveRating: number;
    negativeRating: number;
    author: string;
    title: string;
    description: string;
};
export type TSimilarsRes = {
    total: number;
    items: TSimilars[];
};
type TAwards = {
    name: string;
    win: boolean;
    imageUrl: string | null;
    nominationName: string;
    year: number;
    persons: TPerson[];
};
export type TAwardsUnit = Omit<TAwards, "name" | "win" | "imageUrl" | "year">;
export interface TAwardsItem extends Omit<TAwards, "win" | "persons" | "nominationName"> {
    wins: TAwardsUnit[];
    nominates: TAwardsUnit[];
}

export type TAwardsRes = {
    total: number;
    items: TAwardsItem[];
};
export type TReviewsRes = {
    total: number;
    totalPages: number;
    totalPositiveReviews: number;
    totalNegativeReviews: number;
    totalNeutralReviews: number;
    items: TReviews[];
};
const ReviewsSort = {
    DATE_ASC: "DATE_ASC",
    DATE_DESC: "DATE_DESC",
} as const;
export type TReviewsSort = ObjectValues<typeof ReviewsSort>;
export type TReviewsReq = {
    id: number;
    type: TReviewsSort;
    page: number;
};
export const ImagesCategories = {
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
export type TImagesCategories = ObjectValues<typeof ImagesCategories>;
export type TImagesReq = {
    id: number;
    type: TImagesCategories;
    page: number;
};
export type TImages = {
    imageUrl: string;
    previewUrl: string;
};
export type TImagesRes = {
    total: number;
    totalPages: number;
    items: TImages[];
};
export const TopCategories = {
    TOP_250_BEST_FILMS: "TOP_250_BEST_FILMS",
    TOP_100_POPULAR_FILMS: "TOP_100_POPULAR_FILMS",
    TOP_AWAIT_FILMS: "TOP_AWAIT_FILMS",
} as const;
export type TTopCategories = ObjectValues<typeof TopCategories>;
export type TTopRes = {
    totalPages: number;
    films: TFilm[];
};
export type TTopReq = {
    mainQuery: TTopCategories;
    page: number;
};
export type TFiltersRes = {
    genres: { value: number; label: string }[];
    countries: { value: number; label: string }[];
};
export const SearchCategories = {
    RATING: "RATING",
    NUM_VOTE: "NUM_VOTE",
    YEAR: "YEAR",
} as const;
export type TSearchCategories = ObjectValues<typeof SearchCategories>;
export type TSearchReq = {
    country: number | null;
    genre: number | null;
    ratingFrom: number;
    ratingTo: number;
    yearFrom: number;
    yearTo: number;
    keyword: string;
    order: TSearchCategories;
    page: number;
};
export type TSearchState = Omit<TSearchReq, "order" | "page">;
export type TSearchRes = {
    total: number;
    totalPages: number;
    films: TFilm[];
};
