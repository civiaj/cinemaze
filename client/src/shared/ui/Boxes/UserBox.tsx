import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    rounded?: boolean;
    bottom?: boolean;
    children: ReactNode;
    className?: string;
};

export const UserBox = ({ children, className, bottom, rounded }: Props) => {
    return (
        <div
            className={classNames(
                "flex flex-col gap-2 sm:gap-4 border-border py-4 px-4 sm:px-6 sm:py-6",
                { ["border rounded-xl"]: rounded, ["border-b"]: bottom },
                [className]
            )}
        >
            {children}
        </div>
    );
};

export const UserBoxSeparator = ({ className }: { className?: string }) => {
    return <hr className={classNames("border-t border-border", {}, [className])} />;
};
