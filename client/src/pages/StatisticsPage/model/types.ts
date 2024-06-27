export type ScoreFilters = "userScore" | "rating";
export type TScore = { score: number; count: number };

export type VBFilters = "genres" | "countries";
export type VBSortBy = "count" | "avgUserScore" | "avgRating";

export type VBStat = {
    avgUserScore: number;
    avgRating: number;
    name: string;
    count: number;
};

export type VBOrder = "asc" | "desc";
export type TLIntervals = "1" | "7" | "30" | "year" | "all";

export type TLStat = {
    name: string;
    date: string;
    id: number;
    year?: string;
    userScore: number;
    fullDate: string;
};

export type StatisticsSchema = {
    pie: {
        filter: ScoreFilters;
    };
    verticalBar: {
        sort: VBSortBy;
        filter: VBFilters;
        order: VBOrder;
        showAll: boolean;
    };
    timeline: {
        interval: TLIntervals;
    };
};
