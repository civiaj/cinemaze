import { createContext } from "react";
import { TThemes } from "./types";

type Props = {
    theme: TThemes;
    setTheme: (newTheme: TThemes) => void;
};

export const ThemeContext = createContext<Props>({ theme: "system", setTheme: () => {} });
