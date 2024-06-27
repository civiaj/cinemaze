export type Order = 1 | -1;
export const locales = ["ru", "en", "fr", "ko", "ar"] as const;
export type Locale = (typeof locales)[number];
export const roles = ["user", "admin", "admin-test"] as const;
export type Roles = (typeof roles)[number];

export const providers = ["local", "google", "test"] as const;
export type Providers = (typeof providers)[number];

type CountriesEntity = {
    country: string;
};
type GenresEntity = {
    genre: string;
};

export type UnofficialKinopoiskFilm = {
    filmId: number;
    nameRu: string | null;
    nameEn: string | null;
    year: string | null;
    filmLength: string | null;
    countries: CountriesEntity[] | null;
    genres: GenresEntity[] | null;
    rating: string | null;
    ratingVoteCount: number | null;
    posterUrl: string | null;
    posterUrlPreview: string | null;
    ratingChange: number | null;
    isRatingUp: number | null;
    isAfisha: number | null;
};

export type Film = {
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

export type UnofficialKinopoiskDetails = {
    kinopoiskId: number;
    imdbId: string | null;
    kinopoiskHDId: string | null;
    posterUrl: string | null;
    posterUrlPreview: string | null;
    coverUrl: string | null;
    logoUrl: string | null;
    reviewsCount: number;
    ratingGoodReview: number | null;
    ratingGoodReviewVoteCount: number | null;
    ratingKinopoiskVoteCount: number | null;
    ratingImdbVoteCount: number | null;
    ratingFilmCritics: number | null;
    ratingFilmCriticsVoteCount: number | null;
    ratingAwait: number | null;
    ratingAwaitCount: number | null;
    ratingRfCritics: number | null;
    ratingRfCriticsVoteCount: number | null;
    webUrl: string;
    filmLength: number | null;
    slogan: string | null;
    description: string | null;
    shortDescription?: string | null;
    editorAnnotation?: string | null;
    isTicketsAvailable: boolean;
    productionStatus?: string | null;
    ratingMpaa: string | null;
    ratingAgeLimits: string | null;
    hasImax: boolean | null;
    has3D: boolean | null;
    lastSync: string;
    startYear: number | null;
    endYear: number | null;
    serial: boolean | null;
    shortFilm: boolean | null;
    completed: boolean | null;
    ratingImdb: number | null;
    ratingKinopoisk: number | null;
    year: number | null;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    type: string | null;
    countries: CountriesEntity[] | null;
    genres: GenresEntity[] | null;
};

export type Details = {
    posterUrl: string | null;
    reviewsCount: number | null;
    ratingImdb: number | null;
    webUrl: string | null;
    slogan: string | null;
    ratingMpaa: string | null;
    ratingAgeLimits: string | null;
    ratingKinopoiskVoteCount: number | null;
    description: string | null;
} & Film;

export type UnofficialKinopoiskSearchItem = {
    kinopoiskId: number;
    imdbId: string | null;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    countries: CountriesEntity[] | null;
    genres: GenresEntity[] | null;
    ratingKinopoisk: number | null;
    ratingImdb: number | null;
    year: number | null;
    type: string | null;
    posterUrl: string | null;
    posterUrlPreview: string | null;
};

export interface UnofficialKinopoiskPerson {
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
}

export interface UnofficialKinopoiskAwardsItem {
    name: string;
    win: boolean;
    imageUrl: string | null;
    nominationName: string;
    year: number;
    persons: UnofficialKinopoiskPerson[];
}

export interface UnofficialKinopoiskAwards {
    total: number;
    items: UnofficialKinopoiskAwardsItem[];
}

export type AwardsUnit = Omit<UnofficialKinopoiskAwardsItem, "name" | "win" | "imageUrl" | "year">;

export interface AwardsItem
    extends Omit<UnofficialKinopoiskAwardsItem, "win" | "persons" | "nominationName"> {
    wins: AwardsUnit[];
    nominates: AwardsUnit[];
}

export interface Awards {
    total: number;
    items: AwardsItem[];
}

export type UnofficialKinopoiskGenresEntity = {
    id: number;
    genre: string | null;
};

export type UnofficialKinopoiskCountriesEntity = {
    id: number;
    country: string | null;
};

export type UnofficialKinopoiskFilters = {
    genres: UnofficialKinopoiskGenresEntity[];
    countries: UnofficialKinopoiskCountriesEntity[];
};

export type Filters = {
    genres: { value: number; label: string }[];
    countries: { value: number; label: string }[];
};

export type SearchResults = {
    total: number;
    totalPages: number;
    films: Film[];
};

export type UnofficialKinpoiskSearch = {
    total: number;
    totalPages: number;
    items: UnofficialKinopoiskSearchItem[];
};

export type UnofficialKinopoiskTop = {
    pagesCount: number;
    films: UnofficialKinopoiskFilm[];
};

export type Top = {
    totalPages: number;
    films: Film[];
};

export type UnofficialKinopoiskSimilarsItem = {
    filmId: number;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    posterUrl: string | null;
    posterUrlPreview: string | null;
    relationType: string;
};

export type UnofficialKinopoiskSimilars = {
    total: number;
    items: UnofficialKinopoiskSimilarsItem[];
};

export type Similars = {
    total: number;
    items: Pick<Film, "id" | "nameRu" | "nameEn" | "nameOriginal" | "posterUrlPreview">[];
};
