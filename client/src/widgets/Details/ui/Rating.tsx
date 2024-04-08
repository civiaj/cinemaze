import { Heading } from "shared/ui/Text/Heading";
import { addZerosToNumber } from "shared/lib/addZerosToNumber";
import { Box } from "shared/ui/Boxes/Box";
import { RatingStars, RatingUserScore, TFavorite } from "entities/Favorite";
import { useTranslation } from "react-i18next";

type Props = {
    ratingImdb?: number;
    rating?: string;
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
};

export const Rating = (props: Props) => {
    const { ratingImdb, rating, filmId, updateFavorite, disabled } = props;
    const { t } = useTranslation();

    return (
        <Box>
            <div className="flex gap-4 items-center">
                <Heading headinglevel={3} className="inline">
                    {t("details.rating-t")}
                </Heading>
                {rating && (
                    <div className="bg-my-neutral-100 rounded-md px-2 py-1">
                        <span className="text-sm">
                            {t("details.rating-kp")}:{" "}
                            <span className="font-medium">
                                {addZerosToNumber(Number(rating), 1)}{" "}
                            </span>
                        </span>
                    </div>
                )}
                {ratingImdb && (
                    <div className="bg-my-neutral-100 rounded-md px-2 py-1">
                        <span className="text-sm">
                            {t("details.rating-imdb")}:{" "}
                            <span className="font-medium">{addZerosToNumber(ratingImdb, 1)}</span>
                        </span>
                    </div>
                )}
            </div>
            <div className="flex gap-2 flex-col md:flex-row lg:gap-10">
                <RatingStars disabled={disabled} filmId={filmId} updateFavorite={updateFavorite} />
                <RatingUserScore
                    disabled={disabled}
                    filmId={filmId}
                    updateFavorite={updateFavorite}
                />
            </div>
        </Box>
    );
};
