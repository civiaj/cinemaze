import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    children: ReactNode;
    className?: string;
};

export const RatingBox = ({ children, className }: Props) => {
    return (
        <div
            className={classNames(
                "bg-my-neutral-100 rounded-xl justify-between h-[46px] flex px-2 vsm:px-4 items-center md:flex-1",
                {},
                [className]
            )}
        >
            {children}
        </div>
    );
};
