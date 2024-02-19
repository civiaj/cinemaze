export const addZerosToNumber = (
    num: number,
    length: number,
    fromStart?: boolean,
    char: string | number = "0"
): string | number => {
    const [, decimals] = String(num).split(".");
    if (decimals && decimals.length >= length) return num;

    const add = decimals
        ? String(char).repeat(length - decimals.length)
        : "." + String(char).repeat(length);

    return fromStart ? add + num : num + add;
};
