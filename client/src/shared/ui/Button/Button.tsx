import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
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
    success: "success",
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
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200",
    regularNav:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-white hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100",
    regularIcon:
        "text-inherit rounded-xl [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200 h-10 w-10 justify-center text-xl",
    regularNavIcon:
        "text-inherit rounded-xl [&>*]:stroke-2 active:translate-y-[1px] bg-my-white hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100 h-10 w-10 justify-center text-xl",
    controlIcon:
        "rounded-xl [&>*]:stroke-2 h-10 w-10 justify-center text-xl bg-neutral-950 text-neutral-50 hover:bg-neutral-900 focus-visible:bg-neutral-900",
    popup: "text-inherit text-sm px-4 [&>*]:stroke-2 focus-visible:ring-0 bg-my-white hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100 border-b border-my-neutral-100 last:border-b-0",
    blue: "text-neutral-50 rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-blue-500 justify-center hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-my-neutral-800",
    category:
        "focus-visible:ring-0 text-neutral-400 border-b-2 border-transparent hover:border-b-my-neutral-800 focus-visible:border-b-my-neutral-800 hover:text-my-neutral-800 px-1 h-8 sm:h-10 vsm:px-2",
    regularTag:
        "text-inherit rounded-md px-2 [&>*]:stroke-2 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200 h-auto py-1 text-sm font-medium",
    pagination:
        "!text-sm bg-my-neutral-100 rounded-full !h-8 !w-8 justify-center font-medium hover:bg-my-neutral-200",
    clean: "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-transparent hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100 justify-center",
    danger: "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-red-200 hover:bg-my-red-300 focus-visible:bg-my-red-300 text-neutral-50",
    success:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-my-green-500 hover:bg-my-green-600 focus-visible:bg-my-green-600 text-neutral-50",
    login: "text-neutral-50 rounded-xl [&>*]:stroke-2 active:translate-y-[1px] h-10 w-10 justify-center text-xl bg-gradient-to-br from-blue-400 from-40% to-purple-400 to-90%",
};

const defaultSpinner =
    "fill-neutral-600 dark:fill-neutral-400 text-neutral-300 dark:text-neutral-950";

const spinner: Record<Themes, string> = {
    regular: defaultSpinner,
    blue: "fill-neutral-950 text-neutral-300 dark:fill-neutral-950 dark:text-neutral-300",
    danger: "fill-neutral-950 text-neutral-300 dark:fill-neutral-950 dark:text-neutral-300",
    regularTag: defaultSpinner,
    category: defaultSpinner,
    clean: defaultSpinner,
    controlIcon: defaultSpinner,
    pagination: defaultSpinner,
    popup: defaultSpinner,
    regularIcon: defaultSpinner,
    regularNav: defaultSpinner,
    regularNavIcon: defaultSpinner,
    login: defaultSpinner,
    success: "fill-neutral-950 text-neutral-300 dark:fill-neutral-950 dark:text-neutral-300",
};

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
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
            ref={ref}
            className={classNames(
                "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-between h-10 text-base text-start shrink-0 ring-offset-0 relative",
                {
                    [activeCls]: active,

                    ["focus-visible:ring-0 outline-none cursor-not-allowed"]:
                        disabled && !isLoading,
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
