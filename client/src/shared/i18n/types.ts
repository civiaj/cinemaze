export const LANGUAGES = {
    ru: "ru",
    en: "en",
    fr: "fr",
    ko: "ko",
    ar: "ar",
} as const;
export type TLngs = ObjectValues<typeof LANGUAGES>;
export type TLngsRecord = Record<TLngs, OptionType<TLngs>>;
export const lngs: TLngsRecord = {
    ru: { label: "nav.language-ru", value: "ru" },
    en: { label: "nav.language-en", value: "en" },
    fr: { label: "nav.language-fr", value: "fr" },
    ko: { label: "nav.language-ko", value: "ko" },
    ar: { label: "nav.language-ar", value: "ar" },
};
