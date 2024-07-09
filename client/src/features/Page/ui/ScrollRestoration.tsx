import { useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getHasFilms } from "@/entities/Film";
import { getScrollByPath, uiActions } from "@/entities/Ui";
import { THROTTLE_SCROLL } from "@/shared/const/const";
import { useInitialEffect } from "@/shared/hooks/useInitialEffect";
import { useThrottle } from "@/shared/hooks/useThrottle";
import { ScrollButton } from "./ScrollButton";

export const ScrollRestoration = () => {
    const dispatch = useAppDispatch();
    const scrollRestorationRef = useRef(0);
    const { pathname } = useLocation();
    const scrollRestoration = useAppSelector((state) => getScrollByPath(state, pathname));
    const hasFilms = useAppSelector(getHasFilms);

    const handleScrollBottom = useCallback(() => {
        window.scrollTo(0, scrollRestorationRef.current);
    }, [scrollRestorationRef]);

    const handleScrollTop = useCallback(() => {
        scrollRestorationRef.current = scrollRestoration;
        window.scrollTo(0, 0);
    }, [scrollRestoration]);

    const handleScrollRestoration = useThrottle(() => {
        dispatch(
            uiActions.saveScrollPosition({
                path: pathname,
                scrollPosition: window.scrollY,
            })
        );
    }, THROTTLE_SCROLL);

    useInitialEffect(() => {
        window.scrollTo({ top: hasFilms ? scrollRestoration : 0 });
        dispatch(uiActions.initializeBreadcrumbs(pathname));
    });

    useEffect(() => {
        document.addEventListener("scroll", handleScrollRestoration);
        return () => document.removeEventListener("scroll", handleScrollRestoration);
    }, [handleScrollRestoration]);

    return (
        <ScrollButton
            scrollBottom={handleScrollBottom}
            scrollTop={handleScrollTop}
            scrollRestoration={scrollRestoration}
        />
    );
};
