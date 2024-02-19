export const THEMES = {
    dark: "dark",
    light: "light",
    system: "system",
} as const;
export type TThemes = ObjectValues<typeof THEMES>;
export type TThemesRecord = Record<TThemes, OptionType<TThemes>>;
export const themes: TThemesRecord = {
    system: { label: "System", value: "system" },
    light: { label: "Light", value: "light" },
    dark: { label: "Dark", value: "dark" },
};
