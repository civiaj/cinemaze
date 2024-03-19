import { SearchFiltersT, SearchQueryKeys } from "../model/types";

export const generateNumberOptions = (min: number, max: number) => {
    const result: OptionType[] = [];
    for (let i = min; i <= max; i++) {
        result.push({ label: i, value: i });
    }
    return result;
};

export const checkSearchParams = (
    queryName: SearchQueryKeys,
    value: string | null,
    compareValue: { min: number; max: number; data?: SearchFiltersT }
) => {
    switch (queryName) {
        case "country":
        case "genre": {
            if (value === null || isNaN(Number(value))) return 0;
            const nValue = Number(value);
            const exist = compareValue.data?.countries.find((country) => country?.value === nValue);
            return exist ? nValue : 0;
        }

        case "ratingFrom":
        case "yearFrom": {
            const { min, max } = compareValue;
            if (value === null || isNaN(Number(value))) return min;
            const nValue = Number(value);
            const isCorrect = nValue >= min && nValue <= max;
            return isCorrect ? nValue : min;
        }
        case "ratingTo":
        case "yearTo": {
            const { min, max } = compareValue;
            if (value === null || isNaN(Number(value))) return max;
            const nValue = Number(value);
            const isCorrect = nValue > min && nValue <= max;
            return isCorrect ? nValue : max;
        }
        default: {
            return 0;
        }
    }
};
