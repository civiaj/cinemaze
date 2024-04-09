export interface ReviewT {
    kinopoiskId: number;
    type: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    date: string;
    positiveRating: number;
    negativeRating: number;
    author: string;
    title: string;
    description: string;
}

export interface ReviewQueryT {
    total: number;
    totalPages: number;
    totalPositiveReviews: number;
    totalNegativeReviews: number;
    totalNeutralReviews: number;
    items: ReviewT[];
}

const ReviewSort = {
    DATE_ASC: "DATE_ASC",
    DATE_DESC: "DATE_DESC",
    // некорректо отдает инф-у сервер
    // USER_POSITIVE_RATING_ASC: "USER_POSITIVE_RATING_ASC",
    // USER_POSITIVE_RATING_DESC: "USER_POSITIVE_RATING_DESC",
    // USER_NEGATIVE_RATING_ASC: "USER_NEGATIVE_RATING_ASC",
    // USER_NEGATIVE_RATING_DESC: "USER_NEGATIVE_RATING_DESC"
} as const;

export type ReviewSortT = ObjectValues<typeof ReviewSort>;

export type GetReviewProps = { id: number; type: ReviewSortT; page: number };
