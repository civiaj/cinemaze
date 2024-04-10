import { IconType } from "react-icons";
import { TThemesRecord } from "@/app/theme";
import { TAppearancesRecord } from "@/entities/Ui";
import { TLngsRecord } from "@/shared/i18n/types";

export type NavbarViews = "main" | "language" | "theme" | "appearance";
export type NavbarOptions = Exclude<NavbarViews, "main">;
export type NavbarOptionsType<T> = {
    value: T;
    variants: T extends "language"
        ? TLngsRecord
        : T extends "theme"
        ? TThemesRecord
        : T extends "appearance"
        ? TAppearancesRecord
        : never;
    label: string;
    Icon: IconType;
};
