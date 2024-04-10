import { InputHTMLAttributes, forwardRef, memo } from "react";
import { classNames } from "@/shared/lib/classNames";

const themes = {
    regular: "regular",
    regularNav: "regularNav",
    // popup: "popup",
    // blue: "blue",
    // icon: "icon",
    // "icon-clean": "icon-clean",
} as const;

type Themes = ObjectValues<typeof themes>;

const cls: Record<Themes, string> = {
    regular:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200",
    regularNav:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100",
};

type Props = {
    className?: string;
    theme?: Themes;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(
    forwardRef<HTMLInputElement, Props>((props, ref) => {
        const { type = "text", className, theme = "regular", ...otherProps } = props;
        return (
            <input
                ref={ref}
                type={type}
                className={classNames(
                    "outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between h-10 text-base text-start shrink-0 placeholder-my-neutral-400",
                    {},
                    [theme ? cls[theme] : "", className]
                )}
                {...otherProps}
            />
        );
    })
);
