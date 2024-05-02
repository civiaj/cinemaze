import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    className?: string;
    children: ReactNode;
};

export const PageLikeBox = ({ children, className }: Props) => {
    return (
        <div className="pl-0 appcontainer:pl-[calc(100vw-100%)] w-full h-full">
            <div className="max-w-6xl w-full flex-1 mx-auto relative h-full">
                <main
                    className={classNames(
                        "py-4 px-2 flex flex-col gap-4 h-full min-w-[300px]",
                        {},
                        [className]
                    )}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};
