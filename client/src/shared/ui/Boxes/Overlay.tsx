import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useHideScroll } from "shared/hooks/useHideScroll";
import { classNames } from "shared/lib/classNames";

type Props = {
    className?: string;
    children?: ReactNode;
    hideScroll?: boolean;
    withInert?: boolean;
    theme?: "modal";
} & HTMLAttributes<HTMLDivElement>;

export const Overlay = (props: Props) => {
    const { children, className, withInert, hideScroll, theme, ...otherProps } = props;
    const overlay = useRef<HTMLDivElement>(null);

    const Component = (
        <div
            tabIndex={-1}
            ref={overlay}
            className={classNames(
                "dark:bg-neutral-950/80 bg-neutral-900/80 fixed h-full w-full inset-0 z-20 text-my-neutral-800 min-h-[100dvh] flex items-center justify-center",
                {},
                [className]
            )}
            {...otherProps}
        >
            {withInert && <WithInert />}
            {hideScroll && <HideScroll />}
            {children}
        </div>
    );

    if (theme === "modal") return createPortal(Component, document.getElementById("modal")!);

    return Component;
};

const HideScroll = () => {
    useHideScroll();
    return null;
};

const WithInert = () => {
    useEffect(() => {
        const root = document.getElementById("root");
        if (root) {
            root.inert = true;
        }

        return () => {
            if (root) {
                root.inert = false;
            }
        };
    }, []);
    return null;
};
