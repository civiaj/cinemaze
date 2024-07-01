import { useEffect, useState } from "react";
import { TDetails, TFavorites, UpdateFavorite } from "@/entities/Film";
import { FilledStar, Star } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    updateFavorite: UpdateFavorite;
    disabled: boolean;
    rating?: TDetails["rating"];
    userScore: TFavorites["userScore"];
};

const starsArray = Array(10)
    .fill(0)
    .map((_, i) => i + 1);

export const Stars = (props: Props) => {
    const { updateFavorite, disabled, rating, userScore } = props;

    const ratingPlaceholder = rating ? Number(rating) : 0;

    const [hoverScore, setHoverScore] = useState(() => userScore ?? ratingPlaceholder);

    const handleMouseEnter = (newScore: number) => setHoverScore(newScore);
    const handleMouseLeave = () => setHoverScore(userScore ? userScore : ratingPlaceholder);
    const handleSetScore = (userScore: number) => updateFavorite({ userScore }, "userScore");

    const width = `${hoverScore * 10}%`;

    useEffect(() => {
        if (userScore) setHoverScore(userScore);
        else setHoverScore(ratingPlaceholder);
    }, [userScore, ratingPlaceholder]);

    return (
        <div className="relative self-start">
            <ul onMouseLeave={handleMouseLeave} className="flex">
                {starsArray.map((value) => (
                    <li key={value}>
                        <button
                            disabled={disabled}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onClick={() => handleSetScore(value)}
                            className={
                                "px-1 flex flex-col items-center hover:bg-inherit  font-medium text-my-neutral-300"
                            }
                        >
                            <Star className="stroke-2 text-2xl sm:text-3xl" />
                            <span
                                className={classNames("text-xs", {
                                    ["text-my-neutral-800"]: value <= Math.ceil(hoverScore),
                                })}
                            >
                                {value}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
            <ul
                className={`flex overflow-hidden absolute top-0 left-0 pointer-events-none transition-all duration-100`}
                style={{ width }}
            >
                {starsArray.map((value) => (
                    <li
                        key={value}
                        className={classNames(
                            "text-2xl cursor-pointer px-1 flex flex-col items-center relative text-my-neutral-400 sm:text-3xl",
                            {
                                ["text-blue-500"]: userScore,
                            }
                        )}
                    >
                        <FilledStar />
                    </li>
                ))}
            </ul>
        </div>
    );
};
