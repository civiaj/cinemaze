import { TTheme } from "app/theme/model/types";

const getPreferableTheme = (): TTheme => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export default getPreferableTheme;
