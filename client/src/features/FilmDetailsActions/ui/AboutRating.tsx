import { useTranslation } from "react-i18next";
import { TFavorite } from "@/entities/Favorite";
import { TDetails } from "@/entities/Film";
import { classNames } from "@/shared/lib/classNames";
import { numberWithSpaces } from "@/shared/lib/numberWithSpaces";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { RatingChange } from "./RatingChange";
import { RatingSet } from "./RatingSet";

type Props = Pick<TDetails, "id" | "ratingKinopoiskVoteCount" | "rating" | "reviewsCount"> & {
    disabled: boolean;
    className?: string;
    updateFavorite: (favorite: TFavorite) => Promise<void>;
};

export const AboutRating = (props: Props) => {
    const {
        id,
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
            <RatingChange id={id} disabled={disabled} updateFavorite={updateFavorite} />
            <RatingSet id={id} disabled={disabled} updateFavorite={updateFavorite} />
        </div>
    );
};
