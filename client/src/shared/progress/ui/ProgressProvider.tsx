import { ReactNode, useMemo, useState } from "react";
import { ProgressContext } from "../model/context";

type Props = {
    children: ReactNode;
};

export const ProgressProvider = ({ children }: Props) => {
    const [active, setActive] = useState(false);
    const [progress, setProgress] = useState(0);

    const value = useMemo(
        () => ({ active, setActive, progress, setProgress }),
        [active, setActive, progress, setProgress]
    );

    return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
