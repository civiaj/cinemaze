import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { TFiltersRes, TSearchState, filmActions } from "@/entities/Film";
import { initialSearch } from "@/entities/Film/model/data";
import { Close, Refresh } from "@/shared/assets/icons";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "@/shared/const/const";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { generateNumberOptions } from "../model/helpers";
import { searchPageActions } from "../model/slice";

interface SearchExtendedProps {
    disabled: boolean;
    onClose?: () => void;
    data?: TFiltersRes;
    prevQuery: TSearchState;
    skip: boolean;
}

export const SearchExtended = (props: SearchExtendedProps) => {
    const { disabled, onClose, data, prevQuery, skip } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<TSearchState>(prevQuery);
    const { country, genre, keyword, ratingFrom, ratingTo, yearFrom, yearTo } = query;
    const ratingFromOptions = generateNumberOptions(RATING_FROM_MIN, ratingTo);
    const ratingToOptions = generateNumberOptions(ratingFrom + 1, RATING_TO_MAX);
    const yearFromOptions = generateNumberOptions(YEAR_FROM_MIN, yearTo);
    const yearToOptions = generateNumberOptions(yearFrom + 1, YEAR_TO_MAX);

    const onUpdateFilters = (queryName: keyof TSearchState, newValue: number | string | null) => {
        if (newValue === null) {
            setQuery((prev) => ({ ...prev, [queryName]: newValue }));
        }

        const isString = newValue === "" || isNaN(Number(newValue));
        setQuery((prev) => ({
            ...prev,
            [queryName]: isString ? newValue : Number(newValue),
        }));
    };

    const handleStartSearch = () => {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== null) searchParams.set(key, String(value));
        });
        dispatch(filmActions.clean());
        setSearchParams(searchParams);
        dispatch(searchPageActions.addUserQuery(keyword));
        window.scrollTo(0, 0);
        onClose?.();
    };

    const handleReset = () => {
        setQuery(initialSearch);
        dispatch(filmActions.clean());
        if (searchParams.size) setSearchParams({});
    };

    const areSame = skip ? false : JSON.stringify(prevQuery) === JSON.stringify(query);

    return (
        <>
            <div className="flex flex-col gap-1">
                <span>{t("search.keyword")}</span>
                <Input
                    placeholder={t("search.keyword-place")}
                    value={keyword}
                    onChange={(e) => onUpdateFilters("keyword", e.target.value)}
                    onCleanInput={() => onUpdateFilters("keyword", "")}
                />
            </div>
            <div className="flex flex-col gap-1">
                <span>{t("search.country")}</span>
                {data?.countries && (
                    <div className="flex items-center gap-2 w-full">
                        <AppSelect
                            theme="search"
                            placeholder={"select.country"}
                            options={data.countries}
                            value={country}
                            actionChange={(newValue) => onUpdateFilters("country", newValue)}
                        />
                        {Boolean(country) && (
                            <Button
                                onClick={() => onUpdateFilters("country", null)}
                                theme="regularIcon"
                                className="bg-my-red-200 justify-center hover:bg-my-red-300 focus:bg-my-red-300"
                            >
                                <Close className="text-lg text-neutral-50" />
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <span>{t("search.genre")}</span>
                {data?.genres && (
                    <div className="flex items-center gap-2 flex-1">
                        <AppSelect
                            theme="search"
                            placeholder={"select.genre"}
                            options={data.genres}
                            value={genre}
                            actionChange={(newValue) => onUpdateFilters("genre", newValue)}
                        />
                        {Boolean(genre) && (
                            <Button
                                onClick={() => onUpdateFilters("genre", null)}
                                theme="regularIcon"
                                className="bg-my-red-200 justify-center hover:bg-my-red-300 focus:bg-my-red-300"
                            >
                                <Close className="text-lg text-neutral-50" />
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <span>{t("search.rating")}</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm">{t("search.from")}:</span>
                        <AppSelect
                            theme="search"
                            value={ratingFrom}
                            options={ratingFromOptions}
                            actionChange={(newValue) => onUpdateFilters("ratingFrom", newValue)}
                        />
                    </div>

                    {ratingFrom !== RATING_TO_MAX && (
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">{t("search.to")}:</span>
                            <AppSelect
                                theme="search"
                                value={ratingTo}
                                options={ratingToOptions}
                                actionChange={(newValue) => onUpdateFilters("ratingTo", newValue)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span>{t("search.year")}</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm">{t("search.from")}:</span>
                        <AppSelect
                            theme="search"
                            value={yearFrom}
                            options={yearFromOptions}
                            actionChange={(newValue) => onUpdateFilters("yearFrom", newValue)}
                        />
                    </div>

                    {yearFrom !== YEAR_TO_MAX && (
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">{t("search.to")}:</span>
                            <AppSelect
                                value={yearTo}
                                options={yearToOptions}
                                actionChange={(newValue) => onUpdateFilters("yearTo", newValue)}
                                theme="search"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    disabled={disabled || areSame}
                    theme="blue"
                    onClick={handleStartSearch}
                    className="flex-1"
                >
                    {t("btn.apply")}
                </Button>
                <Button onClick={handleReset} theme="regularIcon">
                    <Refresh />
                </Button>
            </div>
        </>
    );
};
