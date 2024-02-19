export type ViewSwitcherTypes = "description" | "images" | "awards";

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
