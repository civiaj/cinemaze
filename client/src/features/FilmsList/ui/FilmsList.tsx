import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { TFilm } from "@/entities/Film";
import { TAppearances, getUiAppearance } from "@/entities/Ui";
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

    if ((isLoading || isFetching) && page === 1)
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
            <ul className={classNames(`${containerStyle[appearance]}`, {})}>
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        film={film}
                        appearance={appearance}
                        onClick={onFilmCardClick}
                        onDelete={onFilmCardDelete}
                        {...cardProps}
                    />
                ))}
            </ul>
            {!showEnd && !isError && (
                <div className="h-10 flex items-center justify-center">
                    {page > 1 && isFetching && <Spinner />}
                </div>
            )}
            {films.length && isError && (
                <Box className="text-center">
                    <Text>{t("error-film-msg")}</Text>
                </Box>
            )}
        </>
    );
};
