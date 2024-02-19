import { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames";
import { Box } from "shared/ui/Boxes/Box";
import { Pagination } from "widgets/Pagination/Pagination";
import { reviewApi } from "../model/reviewsApi";
import { ReviewSortT } from "../model/types";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewsList } from "./ReviewsList";
import { ID_REVIEWS } from "shared/const/const";
import { Spinner } from "shared/ui/Spinner/Spinner";

interface ReviewsProps {
    filmId: number;
}

export const Reviews = (props: ReviewsProps) => {
    const { filmId } = props;

    const [page, setPage] = useState(1);

    const onChangeTypeOption = useCallback(
        (newOption: string) => setTypeOption(newOption as ReviewSortT),
        []
    );

    const [type, setTypeOption] = useState<ReviewSortT>("DATE_ASC");

    const onChangePage = useCallback((newPage: number) => setPage(newPage), []);

    const { data, isFetching, isLoading } = reviewApi.useGetReviewsQuery({
        id: filmId,
        page,
        type,
    });

    if (isLoading) return <Spinner container="flex items-center justify-center" />;

    return (
        !!data?.items.length && (
            <div
                className={classNames(
                    "flex flex-col gap-4",
                    {
                        ["opacity-50"]: isFetching,
                    },
                    ["onPageNavigation"]
                )}
                id={ID_REVIEWS}
            >
                <Box>
                    <ReviewsHeader
                        onChangeTypeOption={onChangeTypeOption}
                        type={type}
                        isLoading={isFetching}
                    />
                </Box>
                <ReviewsList items={data.items} />
                <Box>
                    <Pagination
                        activePage={page}
                        changePage={onChangePage}
                        numOfPages={data?.totalPages}
                        disabled={isFetching}
                        scrollTo={ID_REVIEWS}
                    />
                </Box>
            </div>
        )
    );
};
