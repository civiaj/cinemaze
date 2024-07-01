import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TFavorites, UpdateFavorite } from "@/entities/Film";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Button } from "@/shared/ui/Button/Button";
import { RatingChangeNumbers } from "./RatingChangeNumbers";

interface RatingSetgSet {
    updateFavorite: UpdateFavorite;
    disabled: boolean;
    userScore: TFavorites["userScore"];
}

export const RatingSet = (props: RatingSetgSet) => {
    const { updateFavorite, disabled, userScore } = props;
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const onSetScore = (userScore: number) => {
        updateFavorite({ userScore }, "userScore");
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
