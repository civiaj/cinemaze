import { twMerge } from "tailwind-merge";

export const classNames = (
    cls: string,
    mods: Record<string, boolean | number | string | undefined | null> = {},
    additional: Array<string | undefined> = []
): string => {
    return twMerge(
        [
            cls,
            ...additional.filter((cls) => !!cls),
            ...Object.entries(mods)
                .filter(([, key]) => !!key)
                .map(([value]) => value),
        ].join(" ")
    );
};
