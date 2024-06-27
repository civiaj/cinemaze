import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { useGetSyncDataQuery } from "@/entities/Favorite";
import { TFilm } from "@/entities/Film";
import { TAppearances, getUiAppearance } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { FilmCard, FilmCardPropsT } from "@/shared/ui/FilmCard";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Text } from "@/shared/ui/Text/Text";
import { FilmListSkeleton } from "./FilmListSkeleton";

type FilmsListPropsT = {
    films: TFilm[];
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

export const FilmsList = (props: FilmsListPropsT) => {
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
        showEnd,
        onFilmCardClick,
        onFilmCardDelete,
        noFilmsMessage,
    } = props;

    const containerStyle: Record<TAppearances, string> = {
        list: listStyles ?? "flex flex-col gap-2",
        tile:
            tileStyles ??
            "grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mdb:grid-cols-5 lg:grid-cols-5",
    };
    const { t } = useTranslation();
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
        (id: number) => {
            return user && pathname !== routePath.favorite
                ? syncData?.films.find((item) => item.id === id)?.hidden
                : false;
        },
        [pathname, syncData, user]
    );

    const findUserScore = useCallback(
        (id: number) => {
            return user ? syncData?.films.find((item) => item.id === id)?.userScore : null;
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
                <Text className="text-center">{noFilmsMessage ?? t("no-film-msg")}</Text>
            </Box>
        );

    return (
        <>
            {isSyncFetching && page > 1 && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <Spinner />
                </div>
            )}
            <ul
                className={classNames(`${containerStyle[appearance]}`, {
                    ["opacity-20 pointer-events-none"]: isSyncFetching && page > 1,
                })}
            >
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        film={film}
                        userScore={findUserScore(film.id)}
                        isHidden={findIsHidden(film.id)}
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
            {films.length && isError && <Text>{t("error-film-msg")}</Text>}
        </>
    );
};
