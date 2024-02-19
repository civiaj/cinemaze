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

export interface FilmImages {
    imageUrl: string;
    previewUrl: string;
}

export interface GetFilmImagesResult {
    total: number;
    totalPages: number;
    items: FilmImages[];
}
