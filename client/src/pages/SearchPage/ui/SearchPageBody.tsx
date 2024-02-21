import { useAppDispatch, useAppSelector } from "app/store";
import { Page, PageError } from "entities/Ui";
import { useInfiniteScroll } from "shared/hooks/useInfiniteScroll";
import { getNoun } from "shared/lib/getNoun";
import { Box } from "shared/ui/Boxes/Box";
import { Heading } from "shared/ui/Text/Heading";
import { FilmsList } from "widgets/FilmsList";
import { Text } from "shared/ui/Text/Text";
import { EndBox } from "shared/ui/Boxes/EndBox";
import formatFilmError from "shared/api/helpers/formatFilmError";

import { useFiltersQuery, useSearchQuery } from "../model/searchPageApi";
import {
    getPreviousQuery,
    getSearchIsInitial,
    getSearchPage,
    getSearchPageInfiniteFilms,
} from "../model/selectors";
import { searchPageActions } from "../model/slice";
import { SearchPageHeader } from "../ui/SearchPageHeader";
import { SearchExtendedSmall } from "../ui/SearchExtendedSmall";
import { SearchExtended } from "./SearchExtended";
import { SearchQueryT } from "../model/types";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

const tileStyles =
    "grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mdb:grid-cols-5 lg:grid-cols-4";

export const SearchPageBody = () => {
    const dispatch = useAppDispatch();
    const isInitial = useAppSelector(getSearchIsInitial);
    const query = useAppSelector(getPreviousQuery);
    const page = useAppSelector(getSearchPage);
    const infiniteFilms = useAppSelector(getSearchPageInfiniteFilms);

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, data, error } = useInfiniteScroll({
        queryHook: useSearchQuery,
        queryParams: { ...query, page },
        setPage: (newPage: number) => dispatch(searchPageActions.setPage(newPage)),
        queryHookSettings: { skip: isInitial },
        setFilms: (films) => dispatch(searchPageActions.setSearchFilms(films)),
    });

    const films = infiniteFilms ?? [];
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length;
    const showHeader = !!infiniteFilms.length || isLoading || isFetching;
    const disabled = isLoading || isFetching;
    const { total } = (data as SearchQueryT) ?? {};

    const {
        data: filters,
        isError: isFilterError,
        error: filterError,
        isLoading: isFiltLoad,
        isFetching: isFiltFetch,
    } = useFiltersQuery();

    const isFilterLoading = isFiltLoad || isFiltFetch;

    let message: string | null = null;
    if (error || filterError) message = formatFilmError(error ?? filterError);
    if (!infiniteFilms.length && (isError || isFilterError)) return <PageError message={message} />;

    return (
        <Page onScrollEnd={onScrollEnd}>
            <Box>
                <div className="gap-4 flex items-center justify-between flex-wrap">
                    <Heading className="max-w-[100%]" headinglevel={1}>
                        {query.keyword ? query.keyword : "Поиск"}
                    </Heading>
                    {total !== undefined && (
                        <Text as="p" className="font-medium">
                            Найдено: <span className="text-blue-500 font-bold">{total}</span>{" "}
                            {getNoun(total, "результат", "результата", "результатов")}
                        </Text>
                    )}
                </div>
                <SearchExtendedSmall
                    disabled={disabled}
                    data={filters}
                    isFilterLoading={isFilterLoading}
                />
            </Box>

            <div className="grid grid-cols-3 gap-4 items-start">
                <div className="flex flex-col gap-2 col-span-3 lg:col-span-2">
                    {isInitial ? (
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

                <Box className="sticky !gap-4 top-[72px] hidden lg:flex">
                    <Heading headinglevel={3}>Расширенный поиск</Heading>
                    <SearchExtended
                        disabled={disabled}
                        data={filters}
                        isFilterLoading={isFilterLoading}
                    />
                </Box>
            </div>
        </Page>
    );
};
