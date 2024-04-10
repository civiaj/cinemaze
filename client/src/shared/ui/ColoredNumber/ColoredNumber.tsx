import { EMPTY_LINE } from "@/shared/const/const";
import { addZerosToNumber } from "@/shared/lib/addZerosToNumber";
import { classNames } from "@/shared/lib/classNames";

interface ColoredNumberProps {
    className?: string;
    number?: number;
    coloredBackground?: boolean;
    addZeros?: boolean;
}

export const ColoredNumber = (props: ColoredNumberProps) => {
    const { number, className, coloredBackground = false, addZeros } = props;

    if (!number) return <span className={className}>{EMPTY_LINE}</span>;

    const displayedNumber = addZeros ? addZerosToNumber(number, 1) : number;

    if (coloredBackground)
        return (
            <span
                className={classNames(
                    "relative",
                    {
                        ["bg-my-green-500"]: number >= 7,
                        ["bg-my-neutral-600"]: number < 7 && number >= 5,
                        ["bg-my-red-500"]: number < 5,
                    },
                    [className]
                )}
            >
                <span
                    className={classNames(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    )}
                >
                    {displayedNumber}
                </span>
            </span>
        );

    return (
        <span
            className={classNames(
                "",
                {
                    ["text-my-green-500"]: number >= 7,
                    ["text-my-neutral-400"]: number < 7 && number >= 5,
                    ["text-my-red-500"]: number < 5,
                },
                [className]
            )}
        >
            {displayedNumber}
        </span>
    );
};
