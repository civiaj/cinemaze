export const SECTIONS_USER = {
    PHOTO: "photo",
    NAME: "name",
    DEVICES: "devices",
    PASSWORD: "password",
} as const;

export type TUserSection = ObjectValues<typeof SECTIONS_USER>;
