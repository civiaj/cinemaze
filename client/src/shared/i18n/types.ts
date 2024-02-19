export const LANGUAGES = {
    ru: "ru",
    en: "en",
} as const;
export type TLngs = ObjectValues<typeof LANGUAGES>;
export type TLngsRecord = Record<TLngs, OptionType<TLngs>>;
export const lngs: TLngsRecord = {
    ru: { label: "Russian", value: "ru" },
    en: { label: "English", value: "en" },
};
