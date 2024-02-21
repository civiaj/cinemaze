import { TThemes, useTheme } from "app/theme";
import { TThemesRecord } from "app/theme";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Checked } from "shared/assets/icons";
import { Button } from "shared/ui/Button/Button";
import { Elipsis } from "shared/ui/Text/Elipsis";

import { options } from "../../model/options";

const themes = options.theme.variants as TThemesRecord;

export const NavbarTheme = () => {
    const { theme, setTheme } = useTheme();
    const onThemeSet = useCallback((newTheme: TThemes) => setTheme(newTheme), [setTheme]);
    const { t } = useTranslation();

    return (
        <ul className="flex flex-col py-2">
            {Object.keys(themes).map((themeKey) => {
                const item = themes[themeKey as TThemes];
                return (
                    <li key={item.label}>
                        <Button
                            onClick={() => onThemeSet(item.value)}
                            theme="popup"
                            className="gap-4 py-2 text-base w-full justify-start"
                        >
                            <span className="w-8 flex items-center justify-center text-xl shrink-0">
                                {theme === item.value && <Checked />}
                            </span>
                            <Elipsis>{t(item.label as string)}</Elipsis>
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};
