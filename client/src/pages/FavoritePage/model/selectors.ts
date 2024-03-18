import { RootState } from "app/store";

import { favoritePageAdapter } from "./slice";

export const getListVariant = (state: RootState) => state.favoritePage.listVariant;
export const getFavoritePage = (state: RootState) => state.favoritePage.page;

const adapterSelectors = favoritePageAdapter.getSelectors<RootState>(
    (state) => state.favoritePage.favoritePageFilms
);

export const getUserPageInfiniteFilms = (state: RootState) => adapterSelectors.selectAll(state);

export const getUserPageInfiniteFilmsById = (id: number | null) => (state: RootState) => {
    if (id == null) return null;
    return adapterSelectors.selectById(state, id);
};
