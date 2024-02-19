import { routePath } from "app/router/router";
import { useAppDispatch, useAppSelector } from "app/store";
import { TFavorite, useGetAllFavoriteQuery, useGetSyncDataQuery } from "entities/Favorite";
import { Page, PageError } from "entities/Ui";

import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatFilmError from "shared/api/helpers/formatFilmError";
import { useInfiniteScroll } from "shared/hooks/useInfiniteScroll";
import { Box } from "shared/ui/Boxes/Box";
import { EndBox } from "shared/ui/Boxes/EndBox";
import { Button } from "shared/ui/Button/Button";
import { Message } from "shared/ui/Text/Message";
import { FilmsList } from "widgets/FilmsList";
import { favoritePageActions } from "../model/slice";
import { FavoriteListVariantT } from "../model/types";
import { FavoritePageHeader } from "./FavoritePageHeader";

import {
    getUserPage,
    getUserPageInfiniteFilms,
    getUserPageInfiniteFilmsById,
} from "../model/selectors";
import { FavoriteRemoveModal } from "../ui/FavoriteRemoveModal";

interface UserPageBodyProps {
    listVariant: FavoriteListVariantT;
}

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const FavoritePageBody = (props: UserPageBodyProps) => {
    const { listVariant } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = useAppSelector(getUserPage);
    const infiniteFilms = useAppSelector(getUserPageInfiniteFilms);
    const [stateFilmId, setStateFilmId] = useState<number | null>(null);
    const film = useAppSelector(getUserPageInfiniteFilmsById(stateFilmId));

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, error } = useInfiniteScroll({
        queryHook: useGetAllFavoriteQuery,
        queryParams: { page, filter: listVariant },
        queryHookSettings: {},
        setPage: (newPage: number) => dispatch(favoritePageActions.setPage(newPage)),
        setFilms: (films) =>
            dispatch(favoritePageActions.setFavoriteFilms(films as (FilmT & TFavorite)[])),
    });

    const films = useMemo(() => infiniteFilms ?? [], [infiniteFilms]);

    const [isOpen, setIsOpen] = useState(false);
    const onOpenDeleteDialog = useCallback((id: number) => {
        setStateFilmId(id);
        setIsOpen(true);
    }, []);

    const onCloseDeleteDialog = useCallback(() => setIsOpen(false), []);
    const stats = useGetSyncDataQuery();
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length;

    if (!stats?.data?.all && !stats.isLoading && !isLoading && !isFetching)
        return (
            <Page>
                <Box className="items-center">
                    <Message message="Для просмотра статистики добавьте или оцените несколько фильмов." />
                    <Button onClick={() => navigate(routePath.main)} theme="regular">
                        Перейти на главную
                    </Button>
                </Box>
            </Page>
        );

    let message: string | null = null;
    if (error) message = formatFilmError(error);
    if (!infiniteFilms.length && isError) return <PageError message={message} />;

    return (
        <Page onScrollEnd={onScrollEnd}>
            <Box>
                <FavoritePageHeader listVariant={listVariant} />
            </Box>
            <FilmsList
                page={page}
                films={films}
                cardProps={{ cardStyles }}
                isLoading={isLoading}
                isFetching={isFetching}
                showEnd={showEnd}
                onFilmCardDelete={onOpenDeleteDialog}
            />
            {showEnd && <EndBox />}
            {isOpen && (
                <FavoriteRemoveModal
                    listVariant={listVariant}
                    onClose={onCloseDeleteDialog}
                    film={film}
                />
            )}
        </Page>
    );
};
