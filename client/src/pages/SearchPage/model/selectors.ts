import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

import { searchPageAdapter } from "./slice";

export const getSearchPageState = (state: RootState) => state.searchPage;
export const getSearchPage = (state: RootState) => state.searchPage.page;
const getSearchUserQueries = (state: RootState) => state.searchPage.userQueries;
export const getSearchOrder = (state: RootState) => state.searchPage.order;
export const getSearchUserQueriesByInput = createSelector(
    [getSearchUserQueries, (_, query: string) => query],
    (userQueries, query) => {
        return userQueries.filter((str) =>
            String(str).trim().toLowerCase().includes(query.trim().toLowerCase())
        );
    }
);

const adapterSelectors = searchPageAdapter.getSelectors<RootState>(
    (state) => state.searchPage.searchPageFilms
);

export const getSearchPageInfiniteFilms = (state: RootState) => adapterSelectors.selectAll(state);
