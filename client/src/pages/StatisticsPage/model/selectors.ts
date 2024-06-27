import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { TStatistics } from "@/entities/Favorite";
import { EMPTY_LINE } from "@/shared/const/const";
import { formatDate } from "@/shared/lib/formatDate";
import {
    ScoreFilters,
    TLIntervals,
    TLStat,
    TScore,
    VBFilters,
    VBOrder,
    VBSortBy,
    VBStat,
} from "./types";

export const getSelectByScore = createSelector(
    [(res: { data?: TStatistics[] }) => res.data, (_, filter: ScoreFilters) => filter],
    (data, filter) => {
        if (!data) return [];
        return data
            .reduce((acc: TScore[], curr) => {
                const { hidden } = curr;
                const value = curr[filter];

                if (value && !hidden) {
                    const score = Math.round(Number(value));
                    const index = acc.findIndex((item) => item.score === score);

                    if (index === -1) {
                        acc.push({ score, count: 1 });
                    } else {
                        acc[index].count += 1;
                    }
                }
                return acc;
            }, [])
            .sort((a, b) => b.score - a.score);
    }
);

export const getSelectByFilter = createSelector(
    [
        (res: { data?: TStatistics[] }) => res.data,
        (_, filter: VBFilters, sortBy: VBSortBy, order: VBOrder) => ({
            filter,
            order,
            sortBy,
        }),
    ],
    (data, { filter, sortBy, order }) => {
        if (!data) return [];

        const result = data
            .reduce((acc: VBStat[], curr) => {
                const { rating, userScore, hidden } = curr;
                const value = curr[filter];

                if (value && !hidden && userScore) {
                    value.forEach((valueItem) => {
                        const index = acc.findIndex((accItem) => accItem.name === valueItem);
                        const ratingNumber = Number(rating) || 0;

                        if (index === -1) {
                            acc.push({
                                avgRating: ratingNumber,
                                avgUserScore: userScore,
                                count: 1,
                                name: valueItem,
                            });
                        } else {
                            acc[index].count += 1;
                            acc[index].avgRating = rating
                                ? (acc[index].avgRating + ratingNumber) / 2
                                : acc[index].avgRating;
                            acc[index].avgUserScore = (acc[index].avgUserScore + userScore) / 2;
                        }
                    });
                }

                return acc;
            }, [])
            .map((item) => {
                return {
                    ...item,
                    avgRating: Math.round(item.avgRating * 10) / 10,
                    avgUserScore: Math.round(item.avgUserScore * 10) / 10,
                };
            });

        return result.sort((a, b) => {
            const diff = order === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];

            if (!diff) {
                return order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }

            return diff;
        });
    }
);

export const getSelectByDate = createSelector(
    [
        (res: { data?: TStatistics[] }) => res.data,
        (_, interval: TLIntervals, locales: string) => ({
            interval,
            locales,
        }),
    ],
    (data, { interval, locales }) => {
        if (!data) return [];
        // data from server is sorted by updateAt field
        const result = data.reduce((acc: TLStat[], curr) => {
            const { id, year, nameRu, updatedAt, userScore, hidden } = curr;
            if (userScore && !hidden) {
                const updateAtDate = new Date(updatedAt).getTime();
                let dateFilter = new Date().setDate(new Date().getDate() - Number(interval));
                let date;

                switch (interval) {
                    case "1": {
                        date = formatDate(updateAtDate, locales, {
                            hour: "numeric",
                            minute: "numeric",
                        });
                        break;
                    }
                    case "7": {
                        date = formatDate(updateAtDate, locales, { weekday: "short" });
                        break;
                    }
                    case "30": {
                        date = formatDate(updateAtDate, locales, {
                            day: "numeric",
                            month: "short",
                        });
                        break;
                    }
                    case "year": {
                        date = formatDate(updateAtDate, locales);
                        dateFilter = new Date().setFullYear(new Date().getFullYear() - 1);
                        break;
                    }

                    case "all": {
                        date = formatDate(updateAtDate, locales);
                        dateFilter = 0;
                        break;
                    }
                }

                if (updateAtDate > dateFilter) {
                    acc.push({
                        id,
                        name: nameRu || EMPTY_LINE,
                        year,
                        date,
                        userScore,
                        fullDate: formatDate(updateAtDate, locales, {
                            hour: "numeric",
                            minute: "numeric",
                            month: "2-digit",
                            year: "numeric",
                            day: "numeric",
                        }),
                    });
                }
            }

            return acc;
        }, []);

        return result;
    }
);

export const getVB = (state: RootState) => state.statisticsPage.verticalBar;
export const getPie = (state: RootState) => state.statisticsPage.pie;
export const getTL = (state: RootState) => state.statisticsPage.timeline;
