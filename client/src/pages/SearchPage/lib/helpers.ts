export const generateNumberOptions = (min: number, max: number) => {
    const result: OptionType[] = [];
    for (let i = min; i <= max; i++) {
        result.push({ label: i, value: i });
    }
    return result;
};

/* eslint-disable @typescript-eslint/no-explicit-any*/

export const compareQueries = (prev: any, curr: any) => {
    return JSON.stringify(prev) === JSON.stringify(curr);
};
