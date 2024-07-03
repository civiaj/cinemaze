import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const getSearchUserQueries = (state: RootState) => state.searchPage.userQueries;
export const getSearchUserQueriesByInput = createSelector(
    [getSearchUserQueries, (_, query: string) => query],
    (userQueries, query) => {
        return userQueries.filter((str) =>
            String(str).trim().toLowerCase().includes(query.trim().toLowerCase())
        );
    }
);
