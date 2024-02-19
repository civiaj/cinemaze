import { RootState } from "app/store";

import { mainPageAdapter } from "./slice";

export const getMainQuery = (state: RootState) => state.mainPage.mainQuery;
export const getMainPage = (state: RootState) => state.mainPage.page;

const adapterSelectors = mainPageAdapter.getSelectors<RootState>(
    (state) => state.mainPage.mainPageFilms
);

export const getMainPageInfiniteFilms = (state: RootState) => adapterSelectors.selectAll(state);
