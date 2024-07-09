import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { adapter } from "./slice";

export const getPage = (state: RootState) => state.film.page;
export const getMainQuery = (state: RootState) => state.film.query.top;
export const getSearchQuery = (state: RootState) => state.film.query.search;
export const getFaviruteQuery = (state: RootState) => state.film.query.favorite;
export const getRoute = (state: RootState) => state.film.route;
const adapterSelectors = adapter.getSelectors<RootState>((state) => state.film.films);
export const getFilms = (state: RootState) => adapterSelectors.selectAll(state);
export const getFilmById = (id: number | null) => (state: RootState) => {
    if (id == null) return null;
    return adapterSelectors.selectById(state, id);
};
export const getHasFilms = createSelector([getFilms], (films) => {
    return films.length > 0;
});
