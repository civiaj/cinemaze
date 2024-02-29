import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useHideScroll } from "shared/hooks/useHideScroll";
import { classNames } from "shared/lib/classNames";

type Props = {
    className?: string;
    children?: ReactNode;
    theme?: "modal";
} & HTMLAttributes<HTMLDivElement>;

export const Overlay = (props: Props) => {
    const { children, className, theme, ...otherProps } = props;

    const overlay = useRef<HTMLDivElement>(null);

    useHideScroll();

    useEffect(() => {
        const root = document.getElementById("root");
        if (root && theme === "modal") {
            root.inert = true;
        }

        return () => {
            if (root && theme === "modal") {
                root.inert = false;
            }
        };
    }, [theme]);

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
            {children}
        </div>
    );

    if (theme === "modal") return createPortal(Component, document.getElementById("modal")!);

    return Component;
};
