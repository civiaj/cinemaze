import { HTMLAttributes, ReactNode, useRef } from "react";

import { useUpdateHeight } from "shared/hooks/useUpdateHeight";
import { classNames } from "shared/lib/classNames";

type Props = {
    className?: string;
    children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Overlay = (props: Props) => {
    const { children, className, ...otherProps } = props;

    const height = useUpdateHeight();
    const overlay = useRef<HTMLDivElement>(null);

    return (
        <div
            style={{ height }}
            ref={overlay}
            className={classNames(
                "dark:bg-neutral-700/50 bg-neutral-900/50 fixed h-full w-full inset-0 overflow-auto z-20 text-my-neutral-800 flex items-center justify-center",
                {},
                [className]
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
};
