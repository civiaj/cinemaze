import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

export const UserBox = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <div
            className={classNames(
                "flex flex-col gap-1 border-b border-border py-4 px-2 sm:px-6",
                {},
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
