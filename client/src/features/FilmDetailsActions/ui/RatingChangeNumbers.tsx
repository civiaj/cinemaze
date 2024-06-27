import { FilledStar } from "@/shared/assets/icons";
import withFocusTrap from "@/shared/hoc/withFocusTrap";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";

interface RatingChangeNumbersProps {
    onSetScore: (newValue: number) => void;
}

export const RatingChangeNumbers = withFocusTrap(({ onSetScore }: RatingChangeNumbersProps) => {
    return (
        <ul className="absolute right-10 top-0 rounded-full flex text-secondary px-4 bg-my-neutral-100 z-[10]">
            <li className="flex items-center px-2">
                <FilledStar className="text-xl text-blue-500" />
            </li>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <li key={value}>
                    <Button
                        onClick={() => onSetScore(value)}
                        className={classNames("h-full text-base hover:scale-110 focus:ring-0 p-2", {
                            ["hover:text-my-green-500 focus-visible:text-my-green-500"]: value >= 7,
                            ["hover:text-my-neutral-500 focus-visible:text-my-neutral-500"]:
                                value < 7 && value >= 5,
                            ["hover:text-my-red-500 focus-visible:text-my-red-500"]: value < 5,
                        })}
                    >
                        <span className="font-bold">{value}</span>
                    </Button>
                </li>
            ))}
        </ul>
    );
});
