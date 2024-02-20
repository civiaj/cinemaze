import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatisticsSchema, TLIntervals, VBFilters, VBOrder, VBSortBy } from "./types";

const initialState: StatisticsSchema = {
    pie: {
        filter: "userScore",
    },
    verticalBar: {
        filter: "genres",
        order: "asc",
        showAll: false,
        sort: "count",
    },
    timeline: {
        interval: "7",
    },
};

const statisticsPageSlice = createSlice({
    name: "statisticsPageSlice",
    initialState: initialState,
    reducers: {
        vbSetSort: (state, action: PayloadAction<VBSortBy>) => {
            state.verticalBar.sort = action.payload;
        },
        vbSetOrder: (state, action: PayloadAction<VBOrder>) => {
            state.verticalBar.order = action.payload;
        },
        vbSetShowAll: (state, action: PayloadAction<boolean>) => {
            state.verticalBar.showAll = action.payload;
        },
        vbSetFilter: (state, action: PayloadAction<VBFilters>) => {
            state.verticalBar.showAll = false;
            state.verticalBar.filter = action.payload;
        },
        tlSetInterval: (state, action: PayloadAction<TLIntervals>) => {
            state.timeline.interval = action.payload;
        },
    },
});

export const { actions: statisticsActions, reducer: statisticsReducer } = statisticsPageSlice;
