import { MutableRefObject, ReactNode, forwardRef, useRef } from "react";
import { useAppSelector } from "@/app/store";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { classNames } from "@/shared/lib/classNames";
import { getIsMobile } from "../../../entities/Ui/model/selectors";
import { ScrollRestoration } from "./ScrollRestoration";

interface PageProps {
    className?: string;
    onScrollEnd?: () => void;
    children: ReactNode;
    isError?: boolean;
}

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    const { children, className, onScrollEnd, isError } = props;
    const isMobile = useAppSelector(getIsMobile);
    const targetRef = useRef() as MutableRefObject<HTMLDivElement>;

    useIntersectionObserver({ targetRef, onScrollEnd: isError ? undefined : onScrollEnd });

    return (
        <>
            <div className="pl-0 appcontainer:pl-[calc(100vw-100%)] w-full h-full">
                <div className="max-w-6xl w-full flex-1 mx-auto relative h-full" ref={ref}>
                    <main
                        className={classNames(
                            "py-4 px-2 flex flex-col gap-4 h-full min-w-[300px]",
                            { ["pb-16"]: isMobile },
                            [className]
                        )}
                    >
                        {children}
                        <ScrollRestoration />
                    </main>
                </div>
                <div id="observerTarget" ref={targetRef} className="h-0 w-0 pointer-events-none" />
            </div>
        </>
    );
});
