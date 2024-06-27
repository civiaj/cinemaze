import { EntityState } from "@reduxjs/toolkit";
import { TFilm, TTopCategories } from "@/entities/Film";

export interface MainPageSchema {
    query: TTopCategories;
    films: EntityState<TFilm>;
    page: number;
}
