import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilmsList } from "@/features/FilmsList";
import { Page } from "@/entities/Ui";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "@/shared/const/const";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Box } from "@/shared/ui/Boxes/Box";
import { EndBox } from "@/shared/ui/Boxes/EndBox";
import { PageLikeBox } from "@/shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { checkSearchParams } from "../lib/helpers";
import { useFiltersQuery, useSearchQuery } from "../model/searchPageApi";
import { getSearchOrder, getSearchPage, getSearchPageInfiniteFilms } from "../model/selectors";
import { searchPageActions } from "../model/slice";
import { SearchQuery, SearchQueryT } from "../model/types";
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
    const page = useAppSelector(getSearchPage);
    const order = useAppSelector(getSearchOrder);
    const infiniteFilms = useAppSelector(getSearchPageInfiniteFilms);
    const filters = useFiltersQuery();
    const { search } = useLocation();

    const country = useMemo(
        () =>
            checkSearchParams("country", searchParams.get("country"), {
                data: filters.data,
                min: 0,
                max: 0,
            }),
        [filters.data, searchParams]
    );

    const genre = useMemo(
        () =>
            checkSearchParams("genre", searchParams.get("genre"), {
                data: filters.data,
                min: 0,
                max: 0,
            }),
        [filters.data, searchParams]
    );
    const ratingFrom = useMemo(
        () =>
            checkSearchParams("ratingFrom", searchParams.get("ratingFrom"), {
                min: RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams]
    );
    const ratingTo = useMemo(
        () =>
            checkSearchParams("ratingTo", searchParams.get("ratingTo"), {
                min: ratingFrom ?? RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams, ratingFrom]
    );
    const yearFrom = useMemo(
        () =>
            checkSearchParams("yearFrom", searchParams.get("yearFrom"), {
                min: YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams]
    );
    const yearTo = useMemo(
        () =>
            checkSearchParams("yearTo", searchParams.get("yearTo"), {
                min: yearFrom ?? YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams, yearFrom]
    );
    const keyword = searchParams.get("keyword") ?? "";

    const query: SearchQuery = { keyword, yearTo, yearFrom, ratingTo, genre, country, ratingFrom };
    const skip = searchParams.size === 0;

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, data, error } = useInfiniteScroll({
        queryHook: useSearchQuery,
        queryParams: { page, order, ...query },
        setPage: (newPage: number) => dispatch(searchPageActions.setPage(newPage)),
        queryHookSettings: { skip },
        setFilms: (films) => dispatch(searchPageActions.setSearchFilms(films)),
    });

    const films = infiniteFilms ?? [];
    const showEnd = !skip && !isLoading && !isFetching && isEnd && !!films.length;
    const showHeader = !!infiniteFilms.length || isLoading || isFetching;
    const disabled = isLoading || isFetching;
    const { total } = (data as SearchQueryT) ?? {};
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(searchPageActions.cleanInfiniteFilms());
    }, [search, dispatch]);

    if (!infiniteFilms.length && (isError || filters.isError))
        return (
            <PageLikeBox>
                <StatusBox
                    isError={isError || filters.isError}
                    msgOrChildren={formatFilmError(error ?? filters.error)}
                    reload
                />
            </PageLikeBox>
        );

    return (
        <Page onScrollEnd={onScrollEnd}>
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
                        key={search}
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
                            key={search}
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
