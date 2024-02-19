import { createContext } from "react";

type Props = {
    active: boolean;
    setActive: (newValue: boolean) => void;
    progress: number;
    setProgress: (newValue: number) => void;
};

export const ProgressContext = createContext<Props>({
    active: false,
    progress: 0,
    setActive: () => {},
    setProgress: () => {},
});
