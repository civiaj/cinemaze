export type Order = 1 | -1;
export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
