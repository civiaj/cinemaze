import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store";
import { routePath } from "app/router/router";
import { TFavorite, useGetAllFavoriteQuery, useGetSyncDataQuery } from "entities/Favorite";
import { Page } from "entities/Ui";
import { FilmsList } from "widgets/FilmsList";
import { useInfiniteScroll } from "shared/hooks/useInfiniteScroll";
import { Box } from "shared/ui/Boxes/Box";
import { EndBox } from "shared/ui/Boxes/EndBox";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { StatusBox } from "shared/ui/Boxes/StatusBox";
import { PageLikeBox } from "shared/ui/Boxes/PageLikeBox";
import formatServerError from "shared/api/helpers/formatServerError";

import { favoritePageActions } from "../model/slice";
import { FavoritePageHeader } from "./FavoritePageHeader";
import {
    getFavoritePage,
    getListVariant,
    getUserPageInfiniteFilms,
    getUserPageInfiniteFilmsById,
} from "../model/selectors";
import { FavoriteRemoveModal } from "../ui/FavoriteRemoveModal";
import { useTranslation } from "react-i18next";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const FavoritePageBody = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = useAppSelector(getFavoritePage);
    const infiniteFilms = useAppSelector(getUserPageInfiniteFilms);
    const listVariant = useAppSelector(getListVariant);
    const [stateFilmId, setStateFilmId] = useState<number | null>(null);
    const removeFilm = useAppSelector(getUserPageInfiniteFilmsById(stateFilmId));
    const { t } = useTranslation();

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
    const isEmpty = !stats?.data?.all && !stats.isLoading && !isLoading && !isFetching;

    if (isEmpty)
        return (
            <PageLikeBox>
                <Box className="items-center text-center">
                    <Text>{t("favorite.empty-msg")}</Text>

                    <Button onClick={() => navigate(routePath.main)} theme="regular">
                        {t("btn.main")}
                    </Button>
                </Box>
            </PageLikeBox>
        );

    if (!infiniteFilms.length && isError)
        return (
            <PageLikeBox>
                <StatusBox isError={isError} msgOrChildren={formatServerError(error)} reload />
            </PageLikeBox>
        );

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
                    film={removeFilm}
                />
            )}
        </Page>
    );
};
