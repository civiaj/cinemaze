import { RatingChange, RatingSet, TFavorite } from "entities/Favorite";
import { classNames } from "shared/lib/classNames";
import { getNoun } from "shared/lib/getNoun";
import { numberWithSpaces } from "shared/lib/numberWithSpaces";
import { ColoredNumber } from "shared/ui/ColoredNumber/ColoredNumber";

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

    return (
        <div className={classNames("flex-col gap-4", {}, [className])}>
            <ColoredNumber className="text-3xl font-bold" number={Number(rating)} addZeros />
            <div className="text-sm">
                <p>
                    <span className="font-medium">
                        {numberWithSpaces(ratingKinopoiskVoteCount)}{" "}
                    </span>
                    {getNoun(ratingKinopoiskVoteCount, "оценка", "оценок", "оценок")}
                </p>
                <p>
                    <span className="font-medium">{numberWithSpaces(reviewsCount)} </span>
                    {getNoun(reviewsCount, "рецензия", "рецензии", "рецензий")}
                </p>
            </div>
            <RatingChange filmId={filmId} disabled={disabled} updateFavorite={updateFavorite} />
            <RatingSet filmId={filmId} disabled={disabled} updateFavorite={updateFavorite} />
        </div>
    );
};
