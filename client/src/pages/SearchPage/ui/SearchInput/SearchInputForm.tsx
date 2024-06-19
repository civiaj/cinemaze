import { ChangeEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

type Props = {
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    inputValue: string;
    onSetActive: () => void;
    isActive: boolean;
    handleStartSearch: (query?: string) => void;
    onCleanInput: () => void;
    focused?: boolean;
};

export const SearchInputForm = (props: Props) => {
    const {
        inputValue,
        onInputChange,
        onKeyDown,
        onSetActive,
        handleStartSearch,
        isActive,
        onCleanInput,
        focused,
    } = props;

    const { t } = useTranslation();
    return (
        <>
            <form className="relative w-full" autoComplete="off" id="fast-search-form">
                <Input
                    className="w-full md:w-96"
                    placeholder={t("search.input-p")}
                    theme="regularNav"
                    value={inputValue}
                    onMouseDown={onSetActive}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    type="text"
                    onCleanInput={onCleanInput}
                    focused={focused}
                    onFocus={onSetActive}
                />
                <input autoComplete="false" name="hidden" type="text" style={{ display: "none" }} />
                <span
                    className={classNames(
                        "absolute top-0 right-0 w-10 h-full items-center justify-center flex rounded-xl pointer-events-none",
                        { ["hidden"]: isActive || inputValue }
                    )}
                >
                    <Search />
                </span>
            </form>
            <Button
                className="hidden sm:flex"
                theme="regularNav"
                onClick={() => handleStartSearch()}
            >
                {t("btn.search")}
            </Button>
        </>
    );
};
