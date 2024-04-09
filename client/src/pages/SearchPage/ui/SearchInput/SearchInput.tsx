import { routePath } from "app/router/router";
import { useAppDispatch } from "app/store";
import { uiActions } from "entities/Ui";
import { ChangeEvent, KeyboardEventHandler, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Close, GoToSearch, Search } from "shared/assets/icons";
import { useHideScroll } from "shared/hooks/useHideScroll";
import { useUpdateHeight } from "shared/hooks/useUpdateHeight";
import { classNames } from "shared/lib/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Overlay } from "shared/ui/Boxes/Overlay";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { OutsideClickWrapper } from "widgets/OutsideClickWrapper/OutsideClickWrapper";

import { searchPageActions } from "../../model/slice";
import { SearchQueryResults } from "./SearchQueryResults";
import { SearchUserQueries } from "./SearchUserQueries";

const extraHeight = 56 + (window.innerHeight / 100) * 10; //3.5rem + 10%

type Props = {
    isActive: boolean;
    setActive: (nevValue: boolean) => void;
};

export const SearchInput = (props: Props) => {
    const { isActive, setActive } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState("");

    const onSetActive = () => {
        setActive(true);
        dispatch(uiActions.closeSidebar());
    };

    const onSetInactive = () => {
        setActive(false);
        inputRef.current?.blur();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const cleanInput = () => {
        setInputValue("");
        inputRef.current?.focus();
    };

    const handleStartSearch = (query?: string) => {
        if (!inputValue && !query) {
            onSetActive();
            inputRef.current?.focus();
            return;
        }
        const searchValue = query ?? inputValue;
        dispatch(searchPageActions.addUserQuery(searchValue));
        cleanInput();
        isActive && onSetInactive();
        navigate(`${routePath.search}?keyword=${searchValue}`);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!isActive) return;
        if (e.key === "Enter") handleStartSearch();
        else if (e.key === "Escape") cleanInput();
    };

    return (
        <>
            <div
                className={classNames("flex justify-center gap-2 flex-1 relative z-10", {
                    ["absolute top-2 left-2 right-2 z-30"]: isActive,
                })}
            >
                <OutsideClickWrapper
                    onClose={onSetInactive}
                    className="flex gap-2 justify-center relative flex-1 md:flex-initial"
                >
                    <form className="relative flex-1 md:flex-initial" autoComplete="off">
                        <span
                            className={classNames(
                                "opacity-100 pointer-events-none absolute top-0 right-0 w-10 h-full flex items-center justify-center",
                                { ["opacity-0"]: isActive }
                            )}
                        >
                            <Search />
                        </span>

                        <button
                            className={classNames(
                                "opacity-0 pointer-events-none absolute top-0 right-0 w-10 h-full flex items-center justify-center",
                                { ["opacity-100 pointer-events-auto"]: isActive && !!inputValue }
                            )}
                            onClick={cleanInput}
                        >
                            <Close />
                        </button>

                        <input
                            autoComplete="false"
                            name="hidden"
                            type="text"
                            style={{ display: "none" }}
                        />

                        <Input
                            className="w-full md:w-96 pr-10"
                            placeholder={t("search.input-p")}
                            theme="regularNav"
                            value={inputValue}
                            onMouseDown={onSetActive}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                            type="text"
                        />
                    </form>
                    {isActive && (
                        <SearchBody
                            inputValue={inputValue}
                            onSetInactive={onSetInactive}
                            handleStartSearch={handleStartSearch}
                        />
                    )}

                    <Button
                        className="hidden sm:flex"
                        theme="regularNav"
                        onClick={() => handleStartSearch()}
                    >
                        {t("btn.search")}
                    </Button>
                </OutsideClickWrapper>
            </div>
            {isActive && <Overlay />}
        </>
    );
};

type SearchBodyProps = {
    inputValue: string;
    onSetInactive: () => void;
    handleStartSearch: () => void;
};

const SearchBody = ({ inputValue, onSetInactive, handleStartSearch }: SearchBodyProps) => {
    const maxHeight = useUpdateHeight(extraHeight);
    const { t } = useTranslation();
    useHideScroll();

    return (
        <div className="overflow-hidden rounded-xl absolute top-full left-0 mb-5 mt-4 w-full">
            <div
                style={{ maxHeight }}
                className="w-full bg-my-white border border-my-neutral-200 overflow-y-auto px-2 py-2 flex flex-col gap-2 overflow-x-hidden"
            >
                <SearchUserQueries inputValue={inputValue} startSearch={handleStartSearch} />

                <SearchQueryResults inputValue={inputValue} onClose={onSetInactive} />

                <AppLink
                    theme="clean"
                    className="flex items-center gap-2 px-2 text-my-green-500"
                    to={routePath.search}
                    onClick={onSetInactive}
                >
                    <div className="flex-1 flex items-center justify-center gap-2">
                        <GoToSearch className="shrink-0" />
                        <span>{t("search.extended")}</span>
                    </div>
                </AppLink>
            </div>
        </div>
    );
};
