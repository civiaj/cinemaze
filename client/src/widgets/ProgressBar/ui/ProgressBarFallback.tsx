import { useEffect } from "react";
import { useProgress } from "@/shared/progress";

export const ProgressBarFallback = () => {
    const { setActive, setProgress } = useProgress();

    useEffect(() => {
        setProgress(0);
        setActive(true);

        return () => {
            setProgress(100);
            setActive(false);
        };
    }, [setActive, setProgress]);

    return null;
};
