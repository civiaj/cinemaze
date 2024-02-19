import { Language, Sun } from "shared/assets/icons";
import { NavbarOptions, NavbarOptionsType } from "../model/types";
import { lngs } from "shared/i18n/types";
import { themes } from "app/theme";
import { appearances } from "entities/Ui";

export const options: Record<
    NavbarOptions,
    NavbarOptionsType<"language"> | NavbarOptionsType<"theme"> | NavbarOptionsType<"appearance">
> = {
    language: {
        label: "Language",
        value: "language",
        variants: lngs,
        Icon: Language,
    },
    theme: {
        label: "Theme",
        value: "theme",
        variants: themes,
        Icon: Sun,
    },
    appearance: {
        label: "Appearance",
        value: "appearance",
        variants: appearances,
        Icon: Sun,
    },
};
