import { useContext } from "react";
import { ProgressContext } from "../model/context";

export const useProgress = () => {
    const { active, setActive, progress, setProgress } = useContext(ProgressContext);
    return { active, setActive, progress, setProgress };
};
