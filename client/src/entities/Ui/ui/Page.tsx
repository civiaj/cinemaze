import { MutableRefObject, ReactNode, forwardRef, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { THROTTLE_SCROLL } from "@/shared/const/const";
import { useInitialEffect } from "@/shared/hooks/useInitialEffect";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useThrottle } from "@/shared/hooks/useThrottle";
import { classNames } from "@/shared/lib/classNames";
import { getScrollByPath } from "../model/selectors";
import { uiActions } from "../model/slice";
import { ScrollButton } from "./ScrollButton";

interface PageProps {
    className?: string;
    onScrollEnd?: () => void;
    children: ReactNode;
}

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    const { children, className, onScrollEnd } = props;
    const rootRef = useRef() as MutableRefObject<HTMLDivElement>;
    const targetRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollRestorationRef = useRef(0);
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();
    const scrollRestoration = useAppSelector((state) => getScrollByPath(state, pathname));

    const handleScrollRestoration = useThrottle(() => {
        dispatch(
            uiActions.saveScrollPosition({
                path: pathname,
                scrollPosition: window.scrollY,
            })
        );
    }, THROTTLE_SCROLL);

    const handleScrollBottom = useCallback(() => {
        window.scrollTo(0, scrollRestorationRef.current);
    }, [scrollRestorationRef]);

    const handleScrollTop = useCallback(() => {
        scrollRestorationRef.current = scrollRestoration;
        window.scrollTo(0, 0);
    }, [scrollRestoration]);

    useIntersectionObserver({ targetRef, onScrollEnd });

    useInitialEffect(() => {
        rootRef.current.scrollTop = scrollRestoration;
        dispatch(uiActions.initializeBreadcrumbs(pathname));
    });

    useEffect(() => {
        document.addEventListener("scroll", handleScrollRestoration);
        return () => document.removeEventListener("scroll", handleScrollRestoration);
    }, [handleScrollRestoration]);

    return (
        <>
            <div className="pl-0 appcontainer:pl-[calc(100vw-100%)] w-full h-full">
                <div className="max-w-6xl w-full flex-1 mx-auto relative h-full" ref={ref}>
                    <main
                        ref={rootRef}
                        className={classNames(
                            "py-4 px-2 flex flex-col gap-4 h-full min-w-[300px]",
                            {},
                            [className]
                        )}
                    >
                        {children}
                    </main>
                </div>
                <div id="observerTarget" ref={targetRef} className="h-0 w-0 pointer-events-none" />
            </div>

            <ScrollButton
                scrollBottom={handleScrollBottom}
                scrollTop={handleScrollTop}
                scrollRestoration={scrollRestoration}
            />
        </>
    );
});
