import { EntityState } from "@reduxjs/toolkit";
import { ChangeEvent, KeyboardEvent } from "react";
import { TFilm, TSearchCategories } from "@/entities/Film";

export interface SearchPageSchema {
    films: EntityState<TFilm>;
    page: number;
    order: TSearchCategories;
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
