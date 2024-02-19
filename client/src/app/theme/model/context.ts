import { TThemes } from "./types";
import { createContext } from "react";

type Props = {
    theme: TThemes;
    setTheme: (newTheme: TThemes) => void;
};

export const ThemeContext = createContext<Props>({ theme: "light", setTheme: () => {} });
