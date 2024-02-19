import { MutableRefObject, useEffect } from "react";

interface useObserverProps {
    targetRef: MutableRefObject<HTMLElement>;
    rootRef?: MutableRefObject<HTMLElement>;
    onScrollEnd?: (observer: IntersectionObserver, entry: IntersectionObserverEntry) => void;
    onScrollStart?: (observer: IntersectionObserver, entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = (props: useObserverProps) => {
    const { onScrollEnd, rootRef, targetRef, onScrollStart } = props;

    useEffect(() => {
        if (!onScrollEnd) return;
        const wrapperElement = rootRef?.current || null;
        const triggerElement = targetRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) onScrollEnd(observer, entry);
                });
            },
            { root: wrapperElement, rootMargin: "1px", threshold: 0 }
        );

        if (triggerElement) observer.observe(triggerElement);

        return () => {
            if (triggerElement) observer.unobserve(triggerElement);
            observer.disconnect();
        };
    }, [targetRef, rootRef, onScrollEnd, onScrollStart]);
};
