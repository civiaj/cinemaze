export const SECTIONS_USER = {
    PHOTO: "photo",
    NAME: "name",
    DEVICES: "devices",
    PASSWORD: "password",
    ROLE: "role",
    DELETE: "delete",
} as const;

export type TUserSection = ObjectValues<typeof SECTIONS_USER>;
