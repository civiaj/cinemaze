export type Order = 1 | -1;
export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const roles = ["user", "admin", "admin-test"] as const;
export type Roles = (typeof roles)[number];

export const providers = ["local", "google", "test"] as const;
export type Providers = (typeof providers)[number];
