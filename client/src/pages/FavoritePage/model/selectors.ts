import { RootState } from "@/app/store";
import { adapter } from "./slice";

export const getListVariant = (state: RootState) => state.favoritePage.listVariant;
export const getFavoritePage = (state: RootState) => state.favoritePage.page;

const adapterSelectors = adapter.getSelectors<RootState>((state) => state.favoritePage.films);

export const getUserPageInfiniteFilms = (state: RootState) => adapterSelectors.selectAll(state);

export const getUserPageInfiniteFilmsById = (id: number | null) => (state: RootState) => {
    if (id == null) return null;
    return adapterSelectors.selectById(state, id);
};
