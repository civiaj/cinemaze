import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ID_REVIEWS } from "@/shared/const/const";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { useReviewsQuery } from "../../model/filmApi";
import { TReviewsSort } from "../../model/types";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewsList } from "./ReviewsList";

interface ReviewsProps {
    id: number;
}

export const Reviews = (props: ReviewsProps) => {
    const { id } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("p") ? Number(searchParams.get("p")) : 1;
    const type = (searchParams.get("type") ?? "DATE_DESC") as TReviewsSort;

    const onChangeTypeOption = useCallback(
        (newOption: string) => {
            searchParams.set("type", newOption);
            setSearchParams(searchParams);
        },
        [setSearchParams, searchParams]
    );

    const onChangePage = useCallback(
        (newPage: number) => {
            searchParams.set("p", String(newPage));
            setSearchParams(searchParams);
        },
        [setSearchParams, searchParams]
    );

    const { data, isFetching, isLoading } = useReviewsQuery({
        id: id,
        page,
        type,
    });

    if (isLoading) return <Spinner container="flex items-center justify-center" />;

    if (data?.total) {
        return (
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
        );
    }
};
