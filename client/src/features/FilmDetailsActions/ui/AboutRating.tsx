import { useTranslation } from "react-i18next";
import { TFavorite } from "@/entities/Favorite";
import { classNames } from "@/shared/lib/classNames";
import { numberWithSpaces } from "@/shared/lib/numberWithSpaces";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { RatingChange } from "./RatingChange";
import { RatingSet } from "./RatingSet";

interface AboutRatingProps {
    className?: string;
    rating?: string;
    ratingKinopoiskVoteCount?: number;
    reviewsCount?: number;
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
}

export const AboutRating = (props: AboutRatingProps) => {
    const {
        filmId,
        rating,
        ratingKinopoiskVoteCount,
        reviewsCount,
        className,
        updateFavorite,
        disabled,
    } = props;

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
                        {t("plural.vote", { count: ratingKinopoiskVoteCount })}
                    </p>
                )}
                {Boolean(reviewsCount) && (
                    <p>
                        <span className="font-medium">{numberWithSpaces(reviewsCount)} </span>
                        {t("plural.review", { count: reviewsCount })}
                    </p>
                )}
            </div>
            <RatingChange filmId={filmId} disabled={disabled} updateFavorite={updateFavorite} />
            <RatingSet filmId={filmId} disabled={disabled} updateFavorite={updateFavorite} />
        </div>
    );
};
