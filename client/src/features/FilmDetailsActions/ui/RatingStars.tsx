import { useTranslation } from "react-i18next";
import { TFavorite } from "@/entities/Favorite";
import { DetailsT } from "@/entities/FilmDetails";
import { addZerosToNumber } from "@/shared/lib/addZerosToNumber";
import { Box } from "@/shared/ui/Boxes/Box";
import { Heading } from "@/shared/ui/Text/Heading";
import { RatingUserScore } from "./RatingUserScore";
import { Stars } from "./Stars";

type Props = {
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
    details: Pick<DetailsT, "ratingImdb" | "rating" | "filmId">;
};

export const RatingStars = (props: Props) => {
    const {
        details: { filmId, rating, ratingImdb },
        updateFavorite,
        disabled,
    } = props;
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
                <Stars
                    disabled={disabled}
                    filmId={filmId}
                    updateFavorite={updateFavorite}
                    rating={rating}
                />
                <RatingUserScore
                    disabled={disabled}
                    filmId={filmId}
                    updateFavorite={updateFavorite}
                />
            </div>
        </Box>
    );
};
