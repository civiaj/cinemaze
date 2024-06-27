/// <reference types="vite/client" />

type ObjectValues<T> = T[keyof T];

type OptionType<T = string | number, K = string | number> = {
    value: T;
    label: K;
};

type CountriesEntity = {
    country: string;
};
type GenresEntity = {
    genre: string;
};

type TCardStyles = {
    title?: string;
    label?: string;
    card?: string;
};
