import { useTranslation } from "react-i18next";
import { TFavorite } from "@/entities/Favorite";
import { TDetails } from "@/entities/Film";
import { addZerosToNumber } from "@/shared/lib/addZerosToNumber";
import { Box } from "@/shared/ui/Boxes/Box";
import { Heading } from "@/shared/ui/Text/Heading";
import { RatingUserScore } from "./RatingUserScore";
import { Stars } from "./Stars";

type Props = {
    updateFavorite: (favorite: TFavorite) => Promise<void>;
    disabled: boolean;
    details: Pick<TDetails, "ratingImdb" | "rating" | "id">;
};

export const RatingStars = (props: Props) => {
    const {
        details: { id, rating, ratingImdb },
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
                    id={id}
                    updateFavorite={updateFavorite}
                    rating={rating}
                />
                <RatingUserScore disabled={disabled} id={id} updateFavorite={updateFavorite} />
            </div>
        </Box>
    );
};
