import { useProgress } from "app/progress";
import { useEffect } from "react";

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
