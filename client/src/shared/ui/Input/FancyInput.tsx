import { InputHTMLAttributes, Ref, useRef, useState } from "react";
import { Close } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

type Props = {
    placeholder?: string;
    onCleanInput: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const FancyInput = (props: Props) => {
    const { placeholder = "Введите значение", value, onCleanInput, ...other } = props;
    const inputRef: Ref<HTMLInputElement> = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const condition = isFocused || Boolean(value);

    return (
        <div className="w-full text-inherit rounded-xl h-12 relative">
            <div
                className={classNames(
                    "pointer-events-none absolute text-sm text-my-neutral-400 transition-all left-4 top-1/2 -translate-y-1/2",
                    { ["top-3 scale-90 origin-left"]: condition }
                )}
            >
                {placeholder}
            </div>
            <Input
                ref={inputRef}
                value={value}
                className={classNames("pt-3 w-full h-full", { ["pr-14"]: condition })}
                {...other}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div>
                <Button
                    theme="clean"
                    type="button"
                    className={classNames(
                        "absolute top-0 right-0 h-full w-12 flex items-center justify-center rounded-xl p-0 active:translate-y-0 text-my-neutral-400 hover:text-my-neutral-900 focus-visible:text-my-neutral-900",
                        { ["hidden pointer-events-none"]: !value }
                    )}
                    onClick={() => {
                        onCleanInput();
                        inputRef.current?.focus();
                    }}
                >
                    <Close className="text-lg" />
                </Button>
            </div>
        </div>
    );
};
