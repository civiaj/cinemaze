import { ThemeContext } from "app/theme/model/context";
import { useContext } from "react";

export const useTheme = () => {
    const { setTheme, theme } = useContext(ThemeContext);
    return { theme, setTheme };
};
