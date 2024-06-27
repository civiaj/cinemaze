import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store";
import { TFavorite, useGetOneFavoriteQuery } from "@/entities/Favorite";
import { TDetails } from "@/entities/Film";
import { selectUser } from "@/entities/User";
import { FilledStar, Star } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";

type Props = {
    id: number;
    updateFavorite: (favorite: TFavorite) => Promise<void>;
    disabled: boolean;
    rating?: TDetails["rating"];
};

const starsArray = Array(10)
    .fill(0)
    .map((_, i) => i + 1);

export const Stars = (props: Props) => {
    const { id, updateFavorite, disabled, rating } = props;

    const user = useAppSelector(selectUser);
    const { currentData: favorite } = useGetOneFavoriteQuery(id, { skip: !user });

    const userScore = favorite?.userScore ?? null;
    const ratingPlaceholder = rating ? Number(rating) : 0;

    const [hoverScore, setHoverScore] = useState(() => userScore ?? ratingPlaceholder);

    const handleMouseEnter = (newScore: number) => setHoverScore(newScore);
    const handleMouseLeave = () => setHoverScore(userScore ? userScore : ratingPlaceholder);
    const handleSetScore = (userScore: number) => updateFavorite({ userScore });

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
