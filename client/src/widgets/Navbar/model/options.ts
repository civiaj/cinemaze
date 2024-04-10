import { appearances } from "@/entities/Ui";
import { Grid, Language, Sun } from "@/shared/assets/icons";
import { lngs } from "@/shared/i18n/types";
import { themes } from "@/shared/theme";
import { NavbarOptions, NavbarOptionsType } from "../model/types";

export const options: Record<
    NavbarOptions,
    NavbarOptionsType<"language"> | NavbarOptionsType<"theme"> | NavbarOptionsType<"appearance">
> = {
    language: {
        label: "nav.language-t",
        value: "language",
        variants: lngs,
        Icon: Language,
    },
    theme: {
        label: "nav.theme-t",
        value: "theme",
        variants: themes,
        Icon: Sun,
    },
    appearance: {
        label: "nav.appearance-t",
        value: "appearance",
        variants: appearances,
        Icon: Grid,
    },
};
