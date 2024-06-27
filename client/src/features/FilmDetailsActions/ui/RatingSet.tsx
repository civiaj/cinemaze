import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { TFavorite, useGetOneFavoriteQuery } from "@/entities/Favorite";
import { selectUser } from "@/entities/User";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Button } from "@/shared/ui/Button/Button";
import { RatingChangeNumbers } from "./RatingChangeNumbers";

interface RatingSetgSet {
    id: number;
    updateFavorite: (favorite: TFavorite) => Promise<void>;
    disabled: boolean;
}

export const RatingSet = (props: RatingSetgSet) => {
    const { id, updateFavorite, disabled } = props;
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);
    const { currentData: favorite } = useGetOneFavoriteQuery(id, { skip: !user });

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
