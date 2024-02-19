import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const getData = (state: RootState) => state.userData.data;

export const getScoreById = createSelector([getData, (_, id: number) => id], (userData, id) => {
    const score = userData[id]?.userScore;
    return score ? score : null;
});

export const getBookmarkById = createSelector([getData, (_, id: number) => id], (userData, id) => {
    const bookmark = userData[id]?.bookmarked;
    return bookmark ? bookmark : false;
});

export const getHiddenById = createSelector([getData, (_, id: number) => id], (userData, id) => {
    const hidden = userData[id]?.hidden;
    return hidden ? hidden : false;
});
