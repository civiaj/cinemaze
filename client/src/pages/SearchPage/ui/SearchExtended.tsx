import { useAppDispatch } from "app/store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Close, Refresh } from "shared/assets/icons";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "shared/const/const";
import { useInitialEffect } from "shared/hooks/useInitialEffect";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";

import { checkSearchParams, generateNumberOptions } from "../lib/helpers";
import { searchPageActions } from "../model/slice";
import { SearchFiltersT, SearchQuery, SearchQueryKeys } from "../model/types";

interface SearchExtendedProps {
    disabled: boolean;
    onClose?: () => void;
    data?: SearchFiltersT;
    onUpdateQuery: (newQuery: SearchQuery) => void;
    prevQuery: SearchQuery | null;
}

const resetFiltersValue: SearchQuery = {
    country: null,
    genre: null,
    keyword: "",
    ratingFrom: RATING_FROM_MIN,
    ratingTo: RATING_TO_MAX,
    yearFrom: YEAR_FROM_MIN,
    yearTo: YEAR_TO_MAX,
};

export const SearchExtended = (props: SearchExtendedProps) => {
    const { disabled, onClose, data, onUpdateQuery, prevQuery } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const country = useMemo(
        () => checkSearchParams("country", searchParams.get("country"), { data, min: 0, max: 0 }),
        [data, searchParams]
    );

    const genre = useMemo(
        () => checkSearchParams("genre", searchParams.get("genre"), { data, min: 0, max: 0 }),
        [data, searchParams]
    );
    const ratingFrom = useMemo(
        () =>
            checkSearchParams("ratingFrom", searchParams.get("ratingFrom"), {
                min: RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams]
    );
    const ratingTo = useMemo(
        () =>
            checkSearchParams("ratingTo", searchParams.get("ratingTo"), {
                min: ratingFrom ?? RATING_FROM_MIN,
                max: RATING_TO_MAX,
            }),
        [searchParams, ratingFrom]
    );
    const yearFrom = useMemo(
        () =>
            checkSearchParams("yearFrom", searchParams.get("yearFrom"), {
                min: YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams]
    );
    const yearTo = useMemo(
        () =>
            checkSearchParams("yearTo", searchParams.get("yearTo"), {
                min: yearFrom ?? YEAR_FROM_MIN,
                max: YEAR_TO_MAX,
            }),
        [searchParams, yearFrom]
    );
    const keyword = searchParams.get("keyword") ?? "";
    const [query, setQuery] = useState<SearchQuery>(
        () =>
            ({
                country,
                genre,
                ratingFrom,
                ratingTo,
                keyword,
                yearFrom,
                yearTo,
            } as SearchQuery)
    );
    const ratingFromOptions = generateNumberOptions(RATING_FROM_MIN, ratingTo!);
    const ratingToOptions = generateNumberOptions(ratingFrom! + 1, RATING_TO_MAX);
    const yearFromOptions = generateNumberOptions(YEAR_FROM_MIN, yearTo!);
    const yearToOptions = generateNumberOptions(yearFrom! + 1, YEAR_TO_MAX);

    const onUpdateFilters = (queryName: SearchQueryKeys, newValue: number | string | null) => {
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
        onUpdateQuery(query);

        Object.entries(query).forEach(([key, value]) => {
            if (value) searchParams.set(key, String(value));
        });
        setSearchParams(searchParams);

        dispatch(searchPageActions.addUserQuery(query.keyword));
        dispatch(searchPageActions.cleanInfiniteFilms());

        window.scrollTo(0, 0);
        onClose?.();
    };

    const handleReset = () => {
        setQuery(resetFiltersValue);
        if (searchParams.size) setSearchParams({});
    };

    useInitialEffect(() => {
        if (
            Object.entries(query).some(
                ([key, value]) =>
                    Boolean(value) &&
                    resetFiltersValue[key as keyof typeof resetFiltersValue] !== value
            )
        ) {
            window.scrollTo(0, 0);
            onUpdateQuery(query);
        }
    });

    const areSame = JSON.stringify(prevQuery) === JSON.stringify(query);

    return (
        <Box className="sticky !gap-4 top-[72px] hidden lg:flex">
            <Heading headinglevel={3}>Расширенный поиск</Heading>

            <div className="flex flex-col gap-1">
                <span>{t("Keyword")}</span>
                <Input
                    className="text-sm"
                    placeholder={t("title_enter")}
                    value={query.keyword}
                    onChange={(e) => onUpdateFilters("keyword", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <span>{t("Сountry")}</span>
                {data?.countries && (
                    <div className="flex items-center gap-2 w-full">
                        <AppSelect
                            theme="search"
                            placeholder={t("country_enter")}
                            options={data.countries}
                            value={query.country}
                            actionChange={(newValue) => onUpdateFilters("country", newValue)}
                        />
                        {Boolean(query.country) && (
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
                <span>{t("Genre")}</span>
                {data?.genres && (
                    <div className="flex items-center gap-2 flex-1">
                        <AppSelect
                            theme="search"
                            placeholder={t("genre_enter")}
                            options={data.genres}
                            value={query.genre}
                            actionChange={(newValue) => onUpdateFilters("genre", newValue)}
                        />
                        {Boolean(query.genre) && (
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
                <span>{t("Rating")}</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm">{t("min-from")}:</span>
                        <AppSelect
                            theme="search"
                            value={query.ratingFrom}
                            options={ratingFromOptions}
                            actionChange={(newValue) => onUpdateFilters("ratingFrom", newValue)}
                        />
                    </div>

                    {ratingFrom !== RATING_TO_MAX && (
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">{t("max-to")}:</span>
                            <AppSelect
                                theme="search"
                                value={query.ratingTo}
                                options={ratingToOptions}
                                actionChange={(newValue) => onUpdateFilters("ratingTo", newValue)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span>{t("Year")}</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm">{t("min-from")}:</span>
                        <AppSelect
                            theme="search"
                            value={query.yearFrom}
                            options={yearFromOptions}
                            actionChange={(newValue) => onUpdateFilters("yearFrom", newValue)}
                        />
                    </div>

                    {yearFrom !== YEAR_TO_MAX && (
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">{t("max-to")}:</span>
                            <AppSelect
                                value={query.yearTo}
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
                    {t("Apply")}
                </Button>
                <Button onClick={handleReset} theme="regularIcon">
                    <Refresh />
                </Button>
            </div>
        </Box>
    );
};
