import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppDispatch } from "@/app/store";
import { uiActions } from "@/entities/Ui";
import { favoritePageActions } from "@/pages/FavoritePage/model/slice";
import { mainPageActions } from "@/pages/MainPage/model/slice";
import { searchPageActions } from "@/pages/SearchPage/model/slice";

export const CleanInfinite = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const except = pathname.includes(`${routePath.details}/`);
    const prevPath = useRef<string | null>(null);

    useEffect(() => {
        if (prevPath.current && !except && pathname !== prevPath.current) {
            dispatch(uiActions.deleteScrollPosition(pathname));
            switch (prevPath.current) {
                case routePath.main: {
                    dispatch(mainPageActions.cleanInfiniteFilms());
                    break;
                }
                case routePath.search: {
                    dispatch(searchPageActions.cleanInfiniteFilms());
                    break;
                }
                case routePath.favorite: {
                    dispatch(favoritePageActions.cleanInfiniteFilms());
                    break;
                }
            }
        }

        return () => {
            if (!except) prevPath.current = pathname;
        };
    }, [except, pathname, dispatch]);

    return null;
};
