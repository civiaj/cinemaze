import { useAppDispatch, useAppSelector } from "app/store";
import { compareQueries, generateNumberOptions } from "pages/SearchPage/lib/helpers";
import {
    getPreviousQuery,
    getSearchIsInitial,
    getSearchQuery,
} from "pages/SearchPage/model/selectors";
import { searchPageActions } from "pages/SearchPage/model/slice";
import { SearchFiltersT } from "pages/SearchPage/model/types";
import { Close, Refresh } from "shared/assets/icons";
import { RATING_FROM_MIN, RATING_TO_MAX, YEAR_FROM_MIN, YEAR_TO_MAX } from "shared/const/const";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Spinner } from "shared/ui/Spinner/Spinner";

interface SearchExtendedProps {
    disabled: boolean;
    onClose?: () => void;
    data?: SearchFiltersT;
    isFilterLoading: boolean;
}

export const SearchExtended = (props: SearchExtendedProps) => {
    const { disabled, onClose, data, isFilterLoading } = props;

    const currQuery = useAppSelector(getSearchQuery);
    const { country, genre, keyword, ratingFrom, ratingTo, yearFrom, yearTo } = currQuery;
    const prevQuery = useAppSelector(getPreviousQuery);
    const areSame = compareQueries(prevQuery, currQuery);

    const dispatch = useAppDispatch();
    const isInitial = useAppSelector(getSearchIsInitial);

    const ratingFromOptions = generateNumberOptions(RATING_FROM_MIN, ratingTo);
    const ratingToOptions = generateNumberOptions(ratingFrom + 1, RATING_TO_MAX);
    const yearFromOptions = generateNumberOptions(YEAR_FROM_MIN, yearTo);
    const yearToOptions = generateNumberOptions(yearFrom + 1, YEAR_TO_MAX);

    const handleSetRatingTo = (num: string) => dispatch(searchPageActions.setRatingTo(Number(num)));

    const handleSetRatingFrom = (num: string) =>
        dispatch(searchPageActions.setRatingFrom(Number(num)));

    const handleSetYearTo = (num: string) => dispatch(searchPageActions.setYearTo(Number(num)));

    const handleSetYearFrom = (num: string) => dispatch(searchPageActions.setYearFrom(Number(num)));

    const handleSetCountry = (newCountry: string) =>
        dispatch(searchPageActions.setCountry(Number(newCountry)));

    const handleSetGenre = (newGenre: string) =>
        dispatch(searchPageActions.setGenre(Number(newGenre)));

    const handleSetKeyword = (newKeyword: string) =>
        dispatch(searchPageActions.setKeyword(newKeyword));

    const handleReset = () => dispatch(searchPageActions.resetSearchQuery());

    const handleStartSearch = () => {
        dispatch(searchPageActions.startSearch());
        dispatch(searchPageActions.addUserQuery(keyword));
        onClose?.();
    };

    if (isFilterLoading) {
        return (
            <div className="flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        data && (
            <>
                <div className="flex flex-col gap-1">
                    <span>Ключевое слово</span>
                    <Input
                        className="text-sm"
                        placeholder="Введите название"
                        value={keyword || ""}
                        onChange={(e) => handleSetKeyword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span>Страна</span>
                    {data?.countries && (
                        <div className="flex items-center gap-2 w-full">
                            <AppSelect
                                theme="search"
                                placeholder="Выберите страну"
                                options={data.countries}
                                value={country}
                                actionChange={handleSetCountry}
                            />
                            {country && (
                                <Button
                                    onClick={() => dispatch(searchPageActions.resetCountry())}
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
                    <span>Жанр</span>
                    {data?.genres && (
                        <div className="flex items-center gap-2 flex-1">
                            <AppSelect
                                theme="search"
                                placeholder="Выберите жанр"
                                options={data.genres}
                                value={genre}
                                actionChange={handleSetGenre}
                            />
                            {genre && (
                                <Button
                                    onClick={() => dispatch(searchPageActions.resetGenre())}
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
                    <span>Рейтинг</span>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">от:</span>
                            <AppSelect
                                theme="search"
                                value={ratingFrom}
                                options={ratingFromOptions}
                                actionChange={handleSetRatingFrom}
                            />
                        </div>

                        {ratingFrom !== RATING_TO_MAX && (
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-sm">до:</span>
                                <AppSelect
                                    theme="search"
                                    value={ratingTo}
                                    options={ratingToOptions}
                                    actionChange={handleSetRatingTo}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Год</span>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm">от:</span>
                            <AppSelect
                                theme="search"
                                value={yearFrom}
                                options={yearFromOptions}
                                actionChange={handleSetYearFrom}
                            />
                        </div>

                        {yearFrom !== YEAR_TO_MAX && (
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-sm">до:</span>
                                <AppSelect
                                    value={yearTo}
                                    options={yearToOptions}
                                    actionChange={handleSetYearTo}
                                    theme="search"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        disabled={(areSame && !isInitial) || disabled}
                        theme="blue"
                        onClick={handleStartSearch}
                        className="flex-1"
                    >
                        Применить
                    </Button>
                    <Button onClick={handleReset} theme="regularIcon">
                        <Refresh />
                    </Button>
                </div>
            </>
        )
    );
};
