import { FilledStar } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button/Button";

interface RatingChangeNumbersProps {
    onSetScore: (newValue: number) => void;
}

export const RatingChangeNumbers = ({ onSetScore }: RatingChangeNumbersProps) => {
    return (
        <ul className="absolute right-0 top-0 rounded-full flex text-secondary px-4 bg-my-neutral-100">
            <li className="flex items-center px-2">
                <FilledStar className="text-xl text-blue-500" />
            </li>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <li key={value}>
                    <Button
                        onClick={() => onSetScore(value)}
                        className={classNames("h-full text-base hover:scale-110 focus:ring-0 p-2", {
                            ["hover:text-my-green-500 focus:text-my-green-500"]: value >= 7,
                            ["hover:text-my-neutral-500 focus:text-my-neutral-500"]:
                                value < 7 && value >= 5,
                            ["hover:text-my-red-500 focus:text-my-red-500"]: value < 5,
                        })}
                    >
                        <span className="font-bold">{value}</span>
                    </Button>
                </li>
            ))}
        </ul>
    );
};
