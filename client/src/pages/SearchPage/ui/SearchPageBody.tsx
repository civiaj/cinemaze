import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { Page } from "entities/Ui";
import { useInfiniteScroll } from "shared/hooks/useInfiniteScroll";
import { getNoun } from "shared/lib/getNoun";
import { Box } from "shared/ui/Boxes/Box";
import { Heading } from "shared/ui/Text/Heading";
import { FilmsList } from "widgets/FilmsList";
import { Text } from "shared/ui/Text/Text";
import { EndBox } from "shared/ui/Boxes/EndBox";
import formatFilmError from "shared/api/helpers/formatFilmError";
import { PageLikeBox } from "shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "shared/ui/Boxes/StatusBox";
import { useFiltersQuery, useSearchQuery } from "../model/searchPageApi";
import { getSearchOrder, getSearchPage, getSearchPageInfiniteFilms } from "../model/selectors";
import { searchPageActions } from "../model/slice";
import { SearchPageHeader } from "../ui/SearchPageHeader";
import { SearchExtendedSmall } from "../ui/SearchExtendedSmall";
import { SearchExtended } from "./SearchExtended";
import { SearchQuery, SearchQueryT } from "../model/types";

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

    const [query, setQuery] = useState<SearchQuery | null>(null);

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, data, error } = useInfiniteScroll({
        queryHook: useSearchQuery,
        queryParams: { ...query, page, order },
        setPage: (newPage: number) => dispatch(searchPageActions.setPage(newPage)),
        queryHookSettings: { skip: !query },
        setFilms: (films) => dispatch(searchPageActions.setSearchFilms(films)),
    });

    const films = infiniteFilms ?? [];
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length;
    const showHeader = !!infiniteFilms.length || isLoading || isFetching;
    const disabled = isLoading || isFetching;
    const { total } = (data as SearchQueryT) ?? {};

    const filters = useFiltersQuery();

    const onUpdateQuery = (newQuery: SearchQuery) => setQuery(newQuery);

    if (!infiniteFilms.length && (isError || filters.isError))
        return (
            <PageLikeBox>
                <StatusBox
                    isError={isError || filters.isError}
                    errorMsg={formatFilmError(error ?? filters.error)}
                />
            </PageLikeBox>
        );

    return (
        <Page onScrollEnd={onScrollEnd}>
            <Box>
                <div className="gap-4 flex items-center justify-between flex-wrap">
                    <Heading className="max-w-[100%]" headinglevel={1}>
                        {searchParams.get("k") || "Поиск"}
                    </Heading>
                    {total !== undefined && (
                        <Text as="p" className="font-medium">
                            Найдено: <span className="text-blue-500 font-bold">{total}</span>{" "}
                            {getNoun(total, "результат", "результата", "результатов")}
                        </Text>
                    )}
                </div>
                {filters.data && (
                    <SearchExtendedSmall
                        prevQuery={query}
                        disabled={disabled}
                        data={filters.data}
                        onUpdateQuery={onUpdateQuery}
                    />
                )}
            </Box>

            <div className="grid grid-cols-3 gap-4 items-start">
                <div className="flex flex-col gap-2 col-span-3 lg:col-span-2">
                    {!query ? (
                        <Box className="text-center">
                            <Text className="font-medium" as="p">
                                Настройте параметры для лучшего поиска.
                            </Text>
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
                                noFilmsMessage="Ничего не найдено. Попробуйте изменить параметры поиска."
                                tileStyles={tileStyles}
                                cardProps={{ cardStyles }}
                                showEnd={showEnd}
                            />
                        </div>
                    )}
                    {showEnd && <EndBox />}
                </div>
                {filters.data && (
                    <SearchExtended
                        prevQuery={query}
                        disabled={disabled}
                        data={filters.data}
                        onUpdateQuery={onUpdateQuery}
                    />
                )}
            </div>
        </Page>
    );
};
