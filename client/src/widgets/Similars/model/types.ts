export type SimilarsT = {
    filmId: number;
    nameRu: string;
    posterUrlPreview: string;
};

export type SimilarsQueryT = {
    total: number;
    items: SimilarsT[];
};
