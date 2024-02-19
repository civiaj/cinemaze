/// <reference types="vite/client" />

type ObjectValues<T> = T[keyof T];

type OptionType<T = string | number, K = string | number> = {
    value: T;
    label: K;
};

interface FilmT {
    filmId: number;
    nameRu?: string;
    nameEn?: string;
    nameOriginal?: string;
    year: string;
    filmLength?: string;
    countries: { country: string }[];
    genres: { genre: string }[];
    rating?: string;
    posterUrlPreview: string;
}

type TCardStyles = {
    title?: string;
    label?: string;
    card?: string;
};
