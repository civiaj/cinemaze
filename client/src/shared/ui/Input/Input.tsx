import {
    InputHTMLAttributes,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Close } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";

const themes = {
    regular: "regular",
    regularNav: "regularNav",
} as const;

type Themes = ObjectValues<typeof themes>;

const cls: Record<Themes, string> = {
    regular:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200",
    regularNav:
        "text-inherit rounded-xl px-4 [&>*]:stroke-2 bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100",
};

const clsBtn: Record<Themes, string> = {
    regular: "hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200",
    regularNav: "hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100",
};

const clsBtnInpuFocused: Record<Themes, string> = {
    regular: "hover:bg-my-neutral-100 focus-visible:bg-my-neutral-100",
    regularNav: "hover:bg-my-neutral-200 focus-visible:bg-my-neutral-200",
};

type Props = {
    className?: string;
    theme?: Themes;
    onCleanInput: () => void;
    fancy?: boolean;
    focused?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(
    forwardRef<HTMLInputElement, Props>((props, ref) => {
        const {
            type = "text",
            className,
            theme = "regular",
            value,
            onCleanInput,
            fancy,
            placeholder,
            focused,
            ...otherProps
        } = props;

        const [isFocused, setFocused] = useState(false);
        const condition = isFocused || Boolean(value);
        const innerRef = useRef<HTMLInputElement | null>(null);

        const combineRef = useCallback(
            (node: HTMLInputElement | null) => {
                if (ref) {
                    if (typeof ref === "function") {
                        ref(node);
                    } else {
                        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
                    }
                }
                innerRef.current = node;
            },
            [ref]
        );

        useEffect(() => {
            let timer: ReturnType<typeof setTimeout> | null = null;
            if (focused) {
                timer = setTimeout(() => {
                    innerRef.current?.focus();
                }, 0);
            }
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }, [focused]);

        return (
            <div
                className={classNames(
                    "relative rounded-xl w-full",
                    {
                        ["h-10"]: !fancy,
                        ["h-12"]: fancy,
                    },
                    [className]
                )}
            >
                {fancy && (
                    <div
                        className={classNames(
                            "pointer-events-none absolute text-sm text-my-neutral-400 transition-all left-4 top-1/2 -translate-y-1/2",
                            { ["top-3 scale-90 origin-left"]: condition }
                        )}
                    >
                        {placeholder}
                    </div>
                )}
                <input
                    ref={combineRef}
                    type={type}
                    value={value}
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                    placeholder={fancy ? "" : placeholder}
                    className={classNames(
                        "outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between text-sm sm:text-base text-start shrink-0 placeholder-my-neutral-400 w-full h-full",
                        {
                            ["pt-3"]: fancy,
                            ["pr-12"]: condition && !fancy,
                            ["pr-14"]: condition && fancy,
                        },
                        [cls[theme]]
                    )}
                    {...otherProps}
                />

                <Button
                    theme="clean"
                    className={classNames(
                        "absolute top-0 right-0 h-full w-10 flex items-center justify-center rounded-xl p-0 active:translate-y-0 text-my-neutral-400 hover:text-my-neutral-900 focus-visible:text-my-neutral-900",
                        {
                            ["hidden pointer-events-none"]: !value,
                            [clsBtnInpuFocused[theme]]: isFocused,
                            ["w-12"]: fancy,
                        },
                        [clsBtn[theme]]
                    )}
                    onClick={() => {
                        onCleanInput();
                        innerRef.current?.focus();
                    }}
                >
                    <Close className="text-lg" />
                </Button>
            </div>
        );
    })
);
