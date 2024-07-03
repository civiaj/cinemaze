import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilmsList } from "@/features/FilmsList";
import {
    useFiltersQuery,
    useSearchQuery,
    TSearchRes,
    getPage,
    getSearchQuery,
    getFilms,
    filmActions,
} from "@/entities/Film";
import { Page } from "@/entities/Ui";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "@/shared/const/const";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Box } from "@/shared/ui/Boxes/Box";
import { EndBox } from "@/shared/ui/Boxes/EndBox";
import { PageLikeBox } from "@/shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { checkSearchParams } from "../model/helpers";
import { SearchExtendedSmall } from "../ui/SearchExtendedSmall";
import { SearchPageHeader } from "../ui/SearchPageHeader";
import { SearchExtended } from "./SearchExtended";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

const tileStyles =
    "grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mdb:grid-cols-5 lg:grid-cols-4";

export const SearchPageBody = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const page = useAppSelector(getPage);
    const order = useAppSelector(getSearchQuery);
    const infiniteFilms = useAppSelector(getFilms);
    const filters = useFiltersQuery();

    const country = useMemo(
        () =>
            checkSearchParams("country", searchParams.get("country"), {
                arr: filters.data?.countries,
            }),
        [filters.data?.countries, searchParams]
    );

    const genre = useMemo(
        () =>
            checkSearchParams("genre", searchParams.get("genre"), {
                arr: filters.data?.genres,
            }),
        [filters.data?.genres, searchParams]
    );
    const ratingFrom = useMemo(
        () =>
            checkSearchParams("ratingFrom", searchParams.get("ratingFrom"), {
                min: RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams]
    )!;
    const ratingTo = useMemo(
        () =>
            checkSearchParams("ratingTo", searchParams.get("ratingTo"), {
                min: ratingFrom ?? RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams, ratingFrom]
    )!;
    const yearFrom = useMemo(
        () =>
            checkSearchParams("yearFrom", searchParams.get("yearFrom"), {
                min: YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams]
    )!;
    const yearTo = useMemo(
        () =>
            checkSearchParams("yearTo", searchParams.get("yearTo"), {
                min: yearFrom ?? YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams, yearFrom]
    )!;

    const keyword = searchParams.get("keyword") ?? "";
    const query = { keyword, yearTo, yearFrom, ratingTo, country, ratingFrom, genre };
    const skip = searchParams.size === 0;

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, data, error } = useInfiniteScroll({
        queryHook: useSearchQuery,
        queryParams: { page, order, ...query },
        setPage: (newPage: number) => dispatch(filmActions.setPage(newPage)),
        queryHookSettings: { skip },
        setFilms: (films) => dispatch(filmActions.setFilm(films)),
    });

    const films = infiniteFilms ?? [];
    const showEnd = !skip && !isLoading && !isFetching && isEnd && !!films.length && !isError;
    const showHeader = !!infiniteFilms.length || isLoading || isFetching;
    const disabled = isLoading || isFetching;
    const { total } = (data as TSearchRes) ?? {};
    const { t } = useTranslation();

    if (!infiniteFilms.length && (isError || filters.isError))
        return (
            <PageLikeBox>
                <StatusBox
                    isError={isError || filters.isError}
                    msgOrChildren={formatServerError(error ?? filters.error)}
                    reload
                />
            </PageLikeBox>
        );

    return (
        <Page onScrollEnd={onScrollEnd} isError={isError}>
            <Box>
                <div className="gap-4 flex items-center justify-between flex-wrap">
                    <Heading className="max-w-[100%]" headinglevel={1}>
                        {searchParams.get("keyword") || t("search-t")}
                    </Heading>
                    {total !== undefined && (
                        <Text as="p" className="font-medium">
                            {t("search.found")}:{" "}
                            <span className="text-blue-500 font-bold">{total}</span>{" "}
                            {t("plural.results", { count: total })}
                        </Text>
                    )}
                </div>
                {filters.data && (
                    <SearchExtendedSmall
                        disabled={disabled}
                        data={filters.data}
                        prevQuery={query}
                        skip={skip}
                    />
                )}
            </Box>

            <div className="grid grid-cols-3 gap-4 items-start">
                <div className="flex flex-col gap-2 col-span-3 lg:col-span-2">
                    {skip ? (
                        <Box className="text-center">
                            <Text as="p">{t("search.initial-msg")}</Text>
                        </Box>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {showHeader && <SearchPageHeader disabled={disabled} />}
                            <FilmsList
                                films={films}
                                page={page}
                                isLoading={isLoading}
                                isFetching={isFetching}
                                isError={isError}
                                noFilmsMessage={t("search.empty-msg")}
                                tileStyles={tileStyles}
                                cardProps={{ cardStyles }}
                                showEnd={showEnd}
                            />
                        </div>
                    )}
                    {showEnd && <EndBox />}
                </div>
                {filters.data && (
                    <Box className="lg:sticky hidden !gap-4 top-[72px] lg:flex">
                        <Heading headinglevel={3}>{t("search.extended")}</Heading>
                        <SearchExtended
                            disabled={disabled}
                            data={filters.data}
                            prevQuery={query}
                            skip={skip}
                        />
                    </Box>
                )}
            </div>
        </Page>
    );
};
