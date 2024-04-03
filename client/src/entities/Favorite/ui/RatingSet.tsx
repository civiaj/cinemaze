import { useAppSelector } from "app/store";
import { TFavorite, useGetOneFavoriteQuery } from "entities/Favorite";
import { selectUser } from "entities/User";
import { useState } from "react";
import { Button } from "shared/ui/Button/Button";
import { OutsideClickWrapper } from "widgets/OutsideClickWrapper/OutsideClickWrapper";
import { RatingChangeNumbers } from "./RatingChangeNumbers";

interface RatingSetgSet {
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
}

export const RatingSet = (props: RatingSetgSet) => {
    const { filmId, updateFavorite, disabled } = props;

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
                    Оценить фильм
                </Button>
            ) : (
                <OutsideClickWrapper onClose={onClose}>
                    <RatingChangeNumbers onSetScore={onSetScore} />
                </OutsideClickWrapper>
            )}
        </div>
    ) : null;
};
