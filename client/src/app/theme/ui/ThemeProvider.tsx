import { ThemeContext } from "app/theme/model/context";
import { THEMES, TThemes } from "app/theme/model/types";
import { ReactNode, useEffect, useMemo } from "react";
import { LOCAL_STORAGE_THEME } from "shared/const/const";
import { useLocalStorage } from "shared/hooks/useLocalStorage";
import { getPreferableTheme } from "../helper/getPreferableTheme";

type Props = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
    const { value: theme, setValue: setTheme } = useLocalStorage<TThemes>(
        getPreferableTheme(),
        LOCAL_STORAGE_THEME
    );

    useEffect(() => {
        const set = () => {
            const classList = document.documentElement.classList;
            Object.keys(THEMES).forEach((theme) => {
                if (classList.contains(theme)) classList.remove(theme);
            });
            switch (theme) {
                case "system": {
                    document.documentElement.classList.add(getPreferableTheme());
                    break;
                }
                case "dark": {
                    document.documentElement.classList.add(THEMES.dark);
                    break;
                }
                case "light": {
                    document.documentElement.classList.add(THEMES.light);
                    break;
                }
                default: {
                    document.documentElement.classList.add(THEMES.light);
                    break;
                }
            }
        };
        set();
    }, [theme]);

    const contextData = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    return <ThemeContext.Provider value={contextData}>{children}</ThemeContext.Provider>;
};
