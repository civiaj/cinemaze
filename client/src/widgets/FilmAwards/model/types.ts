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
