import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilmsList } from "@/features/FilmsList";
import { filmActions, getFilms, getMainQuery, getPage, useTopQuery } from "@/entities/Film";
import { Page } from "@/entities/Ui";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Box } from "@/shared/ui/Boxes/Box";
import { EndBox } from "@/shared/ui/Boxes/EndBox";
import { PageLikeBox } from "@/shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { MainPageHeader } from "./MainPageHeader";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const MainPageBody = () => {
    const mainQuery = useAppSelector(getMainQuery);
    const dispatch = useAppDispatch();
    const infiniteFilms = useAppSelector(getFilms);
    const page = useAppSelector(getPage);

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, error } = useInfiniteScroll({
        queryHook: useTopQuery,
        queryParams: { page, mainQuery },
        setPage: (newPage: number) => dispatch(filmActions.setPage(newPage)),
        setFilms: (films) => dispatch(filmActions.setFilm(films)),
    });

    const films = infiniteFilms ?? [];
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length && !isError;

    if (!infiniteFilms.length && isError)
        return (
            <PageLikeBox>
                <StatusBox msgOrChildren={formatServerError(error)} isError={isError} reload />
            </PageLikeBox>
        );

    return (
        <Page onScrollEnd={onScrollEnd} isError={isError}>
            <Box>
                <MainPageHeader />
            </Box>

            <FilmsList
                films={films}
                page={page}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                cardProps={{ cardStyles }}
                showEnd={showEnd}
            />
            {showEnd && <EndBox />}
        </Page>
    );
};
