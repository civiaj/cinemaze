export const THEMES = {
    dark: "dark",
    light: "light",
    system: "system",
} as const;
export type TThemes = ObjectValues<typeof THEMES>;
export type TThemesRecord = Record<TThemes, OptionType<TThemes>>;
export const themes: TThemesRecord = {
    system: { label: "nav.theme-sys", value: "system" },
    light: { label: "nav.theme-light", value: "light" },
    dark: { label: "nav.theme-dark", value: "dark" },
};
