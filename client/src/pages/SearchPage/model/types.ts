import { ChangeEvent, KeyboardEvent } from "react";

export interface SearchPageSchema {
    userQueries: string[];
}

export type SearchInputFormProps = {
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    inputValue: string;
    onSetActive: () => void;
    isActive: boolean;
    handleStartSearch: (query?: string) => void;
    onCleanInput: () => void;
    focused?: boolean;
};
