import { useContext } from "react";
import { ThemeContext } from "../model/context";

export const useTheme = () => {
    const { setTheme, theme } = useContext(ThemeContext);
    return { theme, setTheme };
};
