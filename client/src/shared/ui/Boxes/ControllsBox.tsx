import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    children: ReactNode;
    className?: string;
};

export const ControllsBox = ({ children, className }: Props) => {
    return (
        <div
            className={classNames("flex gap-2 items-center justify-between w-full sm:w-auto", {}, [
                className,
            ])}
        >
            {children}
        </div>
    );
};
