import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    children: ReactNode;
    className?: string;
    condition: boolean;
};

export const SettingsBox = ({ children, className, condition }: Props) => {
    return condition ? (
        <div
            className={classNames(
                "bg-my-neutral-100 rounded-xl px-2 py-4 sm:px-4 grid grid-cols-[max-content,_auto] gap-x-6 gap-y-2 items-center justify-items-start",
                {},
                [className]
            )}
        >
            {children}
        </div>
    ) : null;
};
