import { TFiltersRes, TSearchState } from "@/entities/Film";

export const generateNumberOptions = (min: number, max: number) => {
    const result: OptionType[] = [];
    for (let i = min; i <= max; i++) {
        result.push({ label: i, value: i });
    }
    return result;
};

export const checkSearchParams = (
    key: keyof TSearchState,
    params: string | null,
    compare: {
        min?: number;
        max?: number;
        arr?: TFiltersRes["countries"] | TFiltersRes["genres"];
    }
) => {
    const { arr, min = 0, max = 0 } = compare;
    const number = Number(params);
    switch (key) {
        case "country":
        case "genre": {
            if (params === null) return null;
            const exist = arr?.find(({ value }) => value === number);
            return exist ? number : null;
        }
        case "ratingFrom":
        case "yearFrom": {
            if (isNaN(number)) return min;
            const isCorrect = number >= min && number <= max;
            return isCorrect ? number : min;
        }
        case "ratingTo":
        case "yearTo": {
            if (isNaN(number)) return max;
            const isCorrect = number > min && number <= max;
            return isCorrect ? number : max;
        }
        default: {
            return null;
        }
    }
};
