import { ButtonHTMLAttributes, memo } from "react";
import { classNames } from "shared/lib/classNames";
import { Spinner } from "shared/ui/Spinner/Spinner";

const themes = {
    regular: "regular",
    regularNav: "regularNav",
    regularIcon: "regularIcon",
    regularNavIcon: "regularNavIcon",
    controlIcon: "controlIcon",
    popup: "popup",
    blue: "blue",
    category: "category",
    regularTag: "regularTag",
    pagination: "pagination",
    clean: "clean",
    danger: "danger",
    login: "login",
} as const;

type Themes = ObjectValues<typeof themes>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: Themes;
    className?: string;
    active?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}

const cls: Record<Themes, string> = {
    regular:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200",
    regularNav:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100",
    regularIcon:
        "text-inherit rounded-xl [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 h-10 w-10 justify-center text-xl",
    regularNavIcon:
        "text-inherit rounded-xl [&>*]:stroke-2 active:translate-y-[1px] bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100 h-10 w-10 justify-center text-xl",
    controlIcon:
        "rounded-xl [&>*]:stroke-2 h-10 w-10 justify-center text-xl bg-neutral-950 text-neutral-50 hover:bg-neutral-900 focus:bg-neutral-900",
    popup: "text-inherit text-sm px-4 [&>*]:stroke-2 focus:ring-0 bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100 border-b border-my-neutral-100 last:border-b-0",
    blue: "text-neutral-50 rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-blue-500 justify-center hover:bg-blue-600 focus:bg-blue-600 focus:ring-my-neutral-800",
    category:
        "focus:ring-0 text-neutral-400 border-b-2 border-transparent hover:border-b-my-neutral-800 focus:border-b-my-neutral-800 hover:text-my-neutral-800 px-1 h-8 sm:h-10 vsm:px-2",
    regularTag:
        "text-inherit rounded-md px-2 [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 h-auto py-1 text-sm font-medium",
    pagination:
        "!text-sm bg-my-neutral-100 rounded-full !h-8 !w-8 justify-center font-medium hover:bg-my-neutral-200",
    clean: "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-transparent hover:bg-my-neutral-200 focus:bg-my-neutral-200 text-blue-500",
    danger: "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-red-200 hover:bg-my-red-300 focus:bg-my-red-300 text-neutral-50",
    login: "text-neutral-50 rounded-xl [&>*]:stroke-2 active:translate-y-[1px] h-10 w-10 justify-center text-xl bg-gradient-to-br from-blue-400 from-40% to-purple-400 to-90%",
};

const spinner: Record<Themes, string> = {
    regular: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    blue: "text-neutral-50 dark:text-neutral-50 fill-neutral-800",
    danger: "text-neutral-50 dark:text-neutral-50 fill-neutral-800",
    regularTag: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    category: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    clean: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    controlIcon: "text-neutral-500 dark:text-neutral-500 fill-neutral-50",
    pagination: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    popup: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    regularIcon: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    regularNav: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    regularNavIcon: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
    login: "text-my-neutral-300 dark:text-my-neutral-200 fill-blue-500",
};

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        active = false,
        theme,
        disabled = false,
        isLoading,
        ...otherProps
    } = props;
    const activeCls = "text-blue-500";

    // bg-[radial-gradient(circle, rgba(230,80,255,1) 0%, rgba(59,130,246,1) 100%)]
    return (
        <button
            className={classNames(
                "outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between h-10 text-base text-start shrink-0 ring-offset-0 relative",
                {
                    [activeCls]: active,

                    ["focus:ring-0 outline-none cursor-not-allowed"]: disabled && !isLoading,
                    ["pointer-events-none text-transparent select-none"]: isLoading,
                },
                [theme ? cls[theme] : "", className]
            )}
            disabled={disabled || isLoading}
            {...otherProps}
        >
            {children}
            {isLoading && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner className={classNames("h-5 w-5", {}, [theme ? spinner[theme] : ""])} />
                </div>
            )}
        </button>
    );
});
