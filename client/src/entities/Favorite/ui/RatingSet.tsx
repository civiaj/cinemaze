import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { TFavorite, useGetOneFavoriteQuery } from "@/entities/Favorite";
import { selectUser } from "@/entities/User";
import { Button } from "@/shared/ui/Button/Button";
import { OutsideClickWrapper } from "@/widgets/OutsideClickWrapper/OutsideClickWrapper";
import { RatingChangeNumbers } from "./RatingChangeNumbers";


interface RatingSetgSet {
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
}

export const RatingSet = (props: RatingSetgSet) => {
    const { filmId, updateFavorite, disabled } = props;
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);
    const { currentData: favorite } = useGetOneFavoriteQuery(filmId, { skip: !user });

    const [isOpen, setIsOpen] = useState(false);
    const userScore = favorite?.userScore;

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const onSetScore = (userScore: number) => {
        updateFavorite({ userScore });
        onClose();
    };

    return !userScore ? (
        <div className="relative w-full">
            {!isOpen ? (
                <Button
                    disabled={disabled}
                    onClick={onOpen}
                    theme="regular"
                    className="sm:text-sm w-full rounded-full justify-center"
                >
                    {t("details.set-rating")}
                </Button>
            ) : (
                <OutsideClickWrapper onClose={onClose}>
                    <RatingChangeNumbers onSetScore={onSetScore} />
                </OutsideClickWrapper>
            )}
        </div>
    ) : null;
};
