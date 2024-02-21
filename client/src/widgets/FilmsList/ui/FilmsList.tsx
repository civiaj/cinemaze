import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { useGetSyncDataQuery } from "entities/Favorite";
import { TAppearances, getUiAppearance } from "entities/Ui";
import { selectUser } from "entities/User";
import { memo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "shared/ui/Boxes/Box";
import { FullscreenSpinner } from "shared/ui/Spinner/FullscreenSpinner";
import { Spinner } from "shared/ui/Spinner/Spinner";

import { Message } from "shared/ui/Text/Message";
import { Text } from "shared/ui/Text/Text";
import { FilmCard, FilmCardPropsT } from "widgets/FilmCard";
import { FilmListSkeleton } from "widgets/FilmsList/ui/FilmListSkeleton";

type FilmsListPropsT = {
    films: FilmT[];
    page: number;
    cardProps?: Partial<FilmCardPropsT>;
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    noFilmsMessage?: string;
    listStyles?: string;
    tileStyles?: string;
    showEnd: boolean;
    onFilmCardClick?: () => void;
    onFilmCardDelete?: (id: number) => void;
};

export const FilmsList = memo((props: FilmsListPropsT) => {
    const appearance = useAppSelector(getUiAppearance);
    const {
        films,
        isFetching,
        isLoading,
        page,
        cardProps,
        listStyles,
        tileStyles,
        isError,
        noFilmsMessage = "Нет элементов для отображения.",
        showEnd,
        onFilmCardClick,
        onFilmCardDelete,
    } = props;

    const containerStyle: Record<TAppearances, string> = {
        list: listStyles ?? "flex flex-col gap-2",
        tile:
            tileStyles ??
            "grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mdb:grid-cols-5 lg:grid-cols-5",
    };

    const { pathname } = useLocation();
    const user = useAppSelector(selectUser);
    const {
        isLoading: isSyncLoading,
        isFetching: isSyncFetching,
        data: syncData,
    } = useGetSyncDataQuery(undefined, {
        skip: !user,
    });

    const findIsHidden = useCallback(
        (filmId: number) => {
            return user && pathname !== routePath.favorite
                ? syncData?.films.find((item) => item.filmId === filmId)?.hidden
                : false;
        },
        [pathname, syncData, user]
    );

    const findUserScore = useCallback(
        (filmId: number) => {
            return user ? syncData?.films.find((item) => item.filmId === filmId)?.userScore : null;
        },
        [syncData, user]
    );

    if ((isLoading || isFetching || isSyncLoading || isSyncFetching) && page === 1)
        return (
            <FilmListSkeleton
                containerStyle={containerStyle[appearance]}
                appearance={appearance}
                cardStyles={cardProps?.cardStyles}
            />
        );

    if (films.length === 0 && !isFetching && !isLoading)
        return (
            <Box>
                <Text className="font-medium text-center">{noFilmsMessage}</Text>
            </Box>
        );

    return (
        <>
            {isSyncFetching && page > 1 && <FullscreenSpinner />}
            <ul className={`${containerStyle[appearance]}`}>
                {films.map((film) => (
                    <FilmCard
                        key={film.filmId}
                        film={film}
                        userScore={findUserScore(film.filmId)}
                        isHidden={findIsHidden(film.filmId)}
                        appearance={appearance}
                        onClick={onFilmCardClick}
                        onDelete={onFilmCardDelete}
                        {...cardProps}
                    />
                ))}
            </ul>
            {!showEnd && (
                <div className="h-10 flex items-center justify-center">
                    {page > 1 && isFetching && <Spinner />}
                </div>
            )}
            {films.length && isError && (
                <Message type="danger" message="При загрузке возникла ошибка." />
            )}
        </>
    );
});
