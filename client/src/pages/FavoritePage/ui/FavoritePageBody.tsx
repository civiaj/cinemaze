import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilmsList } from "@/features/FilmsList";
import {
    filmActions,
    getFaviruteQuery,
    getFilmById,
    getFilms,
    getPage,
    useGetFavoritesQuery,
    useGetStatsTotalQuery,
} from "@/entities/Film";
import { Page } from "@/features/Page";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Box } from "@/shared/ui/Boxes/Box";
import { EndBox } from "@/shared/ui/Boxes/EndBox";
import { PageLikeBox } from "@/shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { FavoriteRemoveModal } from "../ui/FavoriteRemoveModal";
import { FavoritePageHeader } from "./FavoritePageHeader";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const FavoritePageBody = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = useAppSelector(getPage);
    const infiniteFilms = useAppSelector(getFilms);
    const listVariant = useAppSelector(getFaviruteQuery);
    const [stateFilmId, setStateFilmId] = useState<number | null>(null);
    const removeFilm = useAppSelector(getFilmById(stateFilmId));
    const { t } = useTranslation();

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, error } = useInfiniteScroll({
        queryHook: useGetFavoritesQuery,
        queryParams: { page, filter: listVariant },
        setPage: (newPage: number) => dispatch(filmActions.setPage(newPage)),
        setFilms: (films) => dispatch(filmActions.setFilm(films)),
    });

    const films = infiniteFilms ?? [];

    const [isOpen, setIsOpen] = useState(false);
    const onOpenDeleteDialog = useCallback((id: number) => {
        setStateFilmId(id);
        setIsOpen(true);
    }, []);

    const onCloseDeleteDialog = useCallback(() => setIsOpen(false), []);
    const stats = useGetStatsTotalQuery();
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length && !isError;
    const isEmpty =
        !films.length && !stats.isLoading && !isLoading && !isFetching && !stats.data?.all;

    if (isEmpty)
        return (
            <PageLikeBox>
                <Box className="items-center text-center">
                    <Text>{t("favorite.empty-msg")}</Text>

                    <Button onClick={() => navigate(routePath.top)} theme="regular">
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
        <Page onScrollEnd={onScrollEnd} isError={isError}>
            <Box>
                <FavoritePageHeader listVariant={listVariant} />
            </Box>
            <FilmsList
                page={page}
                films={films}
                cardProps={{ cardStyles }}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
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
