import { ProgressContext } from "app/progress/model/context";
import { useContext } from "react";

export const useProgress = () => {
    const { active, setActive, progress, setProgress } = useContext(ProgressContext);
    return { active, setActive, progress, setProgress };
};
