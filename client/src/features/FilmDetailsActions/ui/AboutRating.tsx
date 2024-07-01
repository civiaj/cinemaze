import { useTranslation } from "react-i18next";
import { TDetails, UpdateFavorite } from "@/entities/Film";
import { classNames } from "@/shared/lib/classNames";
import { numberWithSpaces } from "@/shared/lib/numberWithSpaces";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { RatingChange } from "./RatingChange";
import { RatingSet } from "./RatingSet";

type Props = Pick<TDetails, "ratingKinopoiskVoteCount" | "rating" | "reviewsCount" | "favorite"> & {
    disabled: boolean;
    className?: string;
    updateFavorite: UpdateFavorite;
};

export const AboutRating = (props: Props) => {
    const {
        rating,
        ratingKinopoiskVoteCount,
        reviewsCount,
        className,
        updateFavorite,
        disabled,
        favorite,
    } = props;
    const { userScore } = favorite ?? {};
    const { t } = useTranslation();

    return (
        <div className={classNames("flex-col gap-4", {}, [className])}>
            <ColoredNumber className="text-3xl font-bold" number={Number(rating)} addZeros />
            <div className="text-sm">
                {Boolean(ratingKinopoiskVoteCount) && (
                    <p>
                        <span className="font-medium">
                            {numberWithSpaces(ratingKinopoiskVoteCount)}{" "}
                        </span>
                        {t("plural.vote", { count: ratingKinopoiskVoteCount! })}
                    </p>
                )}
                {Boolean(reviewsCount) && (
                    <p>
                        <span className="font-medium">{numberWithSpaces(reviewsCount)} </span>
                        {t("plural.review", { count: reviewsCount! })}
                    </p>
                )}
            </div>
            <RatingChange
                disabled={disabled}
                updateFavorite={updateFavorite}
                userScore={userScore}
            />
            <RatingSet userScore={userScore} disabled={disabled} updateFavorite={updateFavorite} />
        </div>
    );
};
