import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames";

type Props = {
    children: ReactNode;
    className?: string;
    condition: boolean;
};

export const SettingsBox = ({ children, className, condition }: Props) => {
    return condition ? (
        <div
            className={classNames(
                "flex flex-col gap-2 bg-my-neutral-50 rounded-xl items-start px-2 py-2 sm:px-4",
                {},
                [className]
            )}
        >
            {children}
        </div>
    ) : null;
};
