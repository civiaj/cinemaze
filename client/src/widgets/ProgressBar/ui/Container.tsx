import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    active: boolean;
    children: ReactNode;
};

export const Container: React.FC<Props> = ({ children, active }) => (
    <div
        className={classNames(
            "absolute bg-transparent h-[2px] transition-opacity pointer-events-none opacity-0 w-full z-40 duration-700 ease-in",
            {
                ["opacity-100 duration-0"]: active,
            }
        )}
    >
        {children}
    </div>
);
