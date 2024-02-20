import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListChildComponentProps } from "react-window";
import { Down } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { PopupList } from "shared/ui/PopupList/PopupList";

const themes = {
    regular: "regular",
    search: "search",
} as const;

type Themes = ObjectValues<typeof themes>;

const wrapperCls: Record<Themes, string> = {
    regular: "",
    search: "w-full",
};

const cls: Record<Themes, string> = {
    regular: "",
    search: "w-full text-sm",
};

type Props = {
    options: OptionType[];
    value?: string | number | null | undefined;
    actionChange?: (newValue: string) => void;
    className?: string;
    placeholder?: string;
    wrapperClassName?: string;
    disabled?: boolean;
    theme?: Themes;
    render?: (props: ListChildComponentProps, onClose: () => void) => ReactNode;
    translationKey?: string;
};

export const AppSelect = (props: Props) => {
    const {
        options,
        actionChange,
        value,
        className,
        placeholder = "Выберите значение...",
        wrapperClassName,
        disabled,
        render,
        translationKey = "",
        theme = "regular",
        ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation(translationKey);

    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen((p) => !p);

    const handleChange = (newValue: string) => {
        actionChange?.(newValue);
        handleClose();
    };

    const selectedValue = options?.find((e) => e.value === value)?.label ?? placeholder;

    const defaultRender = ({ index, style }: ListChildComponentProps) => (
        <Button
            onClick={() => handleChange(String(options[index].value))}
            theme="popup"
            style={style}
        >
            <span className="line-clamp-1 break-words text-start">
                {t(String(options[index].label))}
            </span>
        </Button>
    );

    return (
        <OutsideClickWrapper
            onClose={handleClose}
            className={classNames("relative", {}, [wrapperCls[theme], wrapperClassName])}
        >
            <div className="flex items-center cursor-pointer gap-2 sm:gap-4">
                <Button
                    disabled={disabled}
                    theme="regular"
                    onClick={handleToggle}
                    className={classNames(
                        "gap-2 font-medium",
                        {
                            ["font-normal text-my-neutral-400"]:
                                !value && typeof value !== "number",
                        },
                        [cls[theme], className]
                    )}
                    {...otherProps}
                >
                    <span className="line-clamp-1 text-start">{t(String(selectedValue))}</span>
                    <Down className="shrink-0" />
                </Button>
            </div>

            <PopupList
                transitionValue={isOpen}
                className="absolute top-0 left-0 w-full z-20"
                render={render ? (props) => render?.(props, handleClose) : defaultRender}
                itemCount={options.length}
            />
        </OutsideClickWrapper>
    );
};
