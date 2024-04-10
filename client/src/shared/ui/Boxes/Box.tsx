import { CSSProperties, HTMLAttributes, ReactNode, forwardRef } from "react";
import { classNames } from "@/shared/lib/classNames";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export const Box = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
    const { children, className, style, ...otherProps } = props;
    return (
        <div
            ref={ref}
            style={style}
            className={classNames(
                "bg-my-white rounded-xl py-4 px-2 flex flex-col gap-2 sm:gap-4 sm:py-6 sm:px-6 shadow-md shadow-my-neutral-200",
                {},
                [className]
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
