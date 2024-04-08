export const APPEARANCES = {
    tile: "tile",
    list: "list",
} as const;
export type TAppearances = ObjectValues<typeof APPEARANCES>;
export type TAppearancesRecord = Record<TAppearances, OptionType<TAppearances>>;
export const appearances: TAppearancesRecord = {
    list: { label: "nav.appearance-list", value: "list" },
    tile: { label: "nav.appearance-tile", value: "tile" },
};

export type BreadcrumbsT = { pathname: string; label: string };

export interface UiSchema {
    sb: boolean;
    na: boolean;
    scroll: Record<string, number>;
    appearance: TAppearances;
    breadcrumbs: {
        main: BreadcrumbsT | null;
        details: BreadcrumbsT[];
    };
}
