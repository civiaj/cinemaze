import { TThemes } from "../model/types";

export const getPreferableTheme = (): TThemes => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};
