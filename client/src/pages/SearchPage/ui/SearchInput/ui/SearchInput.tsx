import { ChangeEvent, KeyboardEventHandler, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppDispatch } from "@/app/store";
import { uiActions } from "@/entities/Ui";
import { searchPageActions } from "../../../model/slice";
import { SearchInputActive } from "./SearchInputActive";
import { SearchInputForm } from "./SearchInputForm";

type Props = {
    isActive: boolean;
    setActive: (nevValue: boolean) => void;
};

export const SearchInput = memo((props: Props) => {
    const { isActive, setActive } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState("");

    const onSetActive = () => {
        setActive(true);
        dispatch(uiActions.closeSidebar());
    };

    const onSetInactive = () => {
        setActive(false);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const cleanInput = () => {
        setInputValue("");
        setActive(true);
    };

    const handleStartSearch = (query?: string) => {
        if (!inputValue && !query) {
            onSetActive();
            return;
        }
        const searchValue = query ?? inputValue;
        dispatch(searchPageActions.addUserQuery(searchValue));
        cleanInput();
        isActive && onSetInactive();
        navigate(`${routePath.search}?keyword=${searchValue}`);
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!isActive) return;
        if (e.key === "Enter") handleStartSearch();
        else if (e.key === "Escape") cleanInput();
    };

    const onCleanInput = () => setInputValue("");
    const inputProps = {
        handleStartSearch,
        inputValue,
        isActive,
        onCleanInput,
        onInputChange,
        onKeyDown,
        onSetActive,
    };

    return isActive ? (
        <SearchInputActive {...inputProps} onSetInactive={onSetInactive} />
    ) : (
        <div className="flex gap-2 justify-center relative flex-1 md:flex-initial">
            <SearchInputForm {...inputProps} />
        </div>
    );
});
