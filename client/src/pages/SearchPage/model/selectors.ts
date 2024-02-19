import { RootState } from "app/store";
import { searchPageAdapter } from "./slice";
import { createSelector } from "@reduxjs/toolkit";

export const getSearchPageState = (state: RootState) => state.searchPage;
export const getPreviousQuery = (state: RootState) => state.searchPage.previousQuery;
export const getSearchQuery = (state: RootState) => state.searchPage.query;
export const getSearchIsInitial = (state: RootState) => state.searchPage.isInitial;
export const getSearchPage = (state: RootState) => state.searchPage.page;
export const getSearchOrder = (state: RootState) => state.searchPage.query.order;
export const getSearchKeyword = (state: RootState) => state.searchPage.query.keyword;
export const geInitialSearchQuery = (state: RootState) => state.searchPage.initialQuery;
const getSearchUserQueries = (state: RootState) => state.searchPage.userQueries;

export const getSearchUserQueriesByInput = createSelector(
    [getSearchUserQueries, (_, query: string) => query],
    (userQueries, query) => {
        return userQueries.filter((str) =>
            str.trim().toLowerCase().includes(query.trim().toLowerCase())
        );
    }
);

const adapterSelectors = searchPageAdapter.getSelectors<RootState>(
    (state) => state.searchPage.searchPageFilms
);

export const getSearchPageInfiniteFilms = (state: RootState) => adapterSelectors.selectAll(state);
