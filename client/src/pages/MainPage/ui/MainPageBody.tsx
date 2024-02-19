import { useAppDispatch, useAppSelector } from "app/store";
import { Page, PageError } from "entities/Ui";
import { Box } from "shared/ui/Boxes/Box";
import { FilmsList } from "widgets/FilmsList";
import { getMainPage, getMainPageInfiniteFilms } from "pages/MainPage/model/selectors";
import { useFilmsQuery } from "../model/mainPageApi";
import { mainPageActions } from "../model/slice";
import { MainQueryT } from "../model/types";
import { MainPageHeader } from "./MainPageHeader";
import { useInfiniteScroll } from "shared/hooks/useInfiniteScroll";
import { EndBox } from "shared/ui/Boxes/EndBox";
import { useMemo } from "react";
import formatFilmError from "shared/api/helpers/formatFilmError";

interface MainPageBodyProps {
    mainQuery: MainQueryT;
}

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const MainPageBody = (props: MainPageBodyProps) => {
    const { mainQuery } = props;
    const dispatch = useAppDispatch();
    const infiniteFilms = useAppSelector(getMainPageInfiniteFilms);
    const page = useAppSelector(getMainPage);

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, error } = useInfiniteScroll({
        queryHook: useFilmsQuery,
        queryParams: { page, mainQuery },
        setPage: (newPage: number) => dispatch(mainPageActions.setPage(newPage)),
        setFilms: (films) => dispatch(mainPageActions.setMainPageFilms(films)),
    });

    const films = useMemo(() => infiniteFilms ?? [], [infiniteFilms]);
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length;

    let message: string | null = null;
    if (error) message = formatFilmError(error);
    if (!infiniteFilms.length && isError) return <PageError message={message} />;

    return (
        <Page onScrollEnd={onScrollEnd}>
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
