import { ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";
import { Text } from "./Text";

export const Elipsis = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <Text as="span" className={classNames("truncate", {}, [className])}>
            {children}
        </Text>
    );
};
