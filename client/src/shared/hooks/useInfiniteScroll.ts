import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useCallback, useEffect } from "react";
import { TFilm } from "@/entities/Film";

/* eslint-disable @typescript-eslint/no-explicit-any*/

interface useInfiniteScrollProps {
    queryHook: UseQuery<any>;
    queryParams: {
        page: number;
        [x: string]: any;
    };
    setPage: (newPage: number) => void;
    setFilms: (films: TFilm[]) => void;
    queryHookSettings?: {
        skip?: boolean;
        refetchOnMountOrArgChange?: boolean | number;
        pollingInterval?: number;
        refetchOnReconnect?: boolean;
        refetchOnFocus?: boolean;
    };
}

interface QueryHookResponse {
    films: any[];
    totalPages: number;
}

export const useInfiniteScroll = ({
    setFilms,
    queryHook,
    queryParams,
    setPage,
    queryHookSettings = {},
}: useInfiniteScrollProps) => {
    const { page } = queryParams;

    const queryResult = queryHook({ ...queryParams }, queryHookSettings);
    const { data, isLoading, isFetching } = queryResult;
    const { films = [], totalPages } = (data as QueryHookResponse) ?? {};

    const areMorePages = totalPages && page < totalPages;
    const waitLoading = isLoading || isFetching;

    const isEnd = totalPages !== null && page >= totalPages;

    const onScrollEnd = useCallback(() => {
        if (areMorePages && !waitLoading) setPage(page + 1);
    }, [areMorePages, waitLoading, setPage, page]);

    useEffect(() => {
        if (!waitLoading && films) {
            setFilms(films);
        }
    }, [waitLoading, films, setFilms]);

    return { ...queryResult, isEnd, onScrollEnd };
};
