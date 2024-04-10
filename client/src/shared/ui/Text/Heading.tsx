import React, { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
    headinglevel: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = (props: HeadingProps) => {
    const { children, className, headinglevel = 2 } = props;

    const styles: Record<typeof headinglevel, string> = {
        "1": "font-bold text-xl sm:text-2xl ",
        "2": "",
        "3": "font-bold text-base text-inherit sm:text-lg",
        "4": "font-bold text-base",
        "5": "",
        "6": "",
    };

    const HeadingTag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
        React.createElement("h" + headinglevel, props, children);

    return (
        <HeadingTag
            className={classNames("shrink-0 line-clamp-1 break-words", {}, [
                styles[headinglevel],
                className,
            ])}
        >
            {children}
        </HeadingTag>
    );
};
