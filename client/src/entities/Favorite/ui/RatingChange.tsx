import { useAppSelector } from "app/store";
import { useState } from "react";
import { Change, Trashcan } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { ColoredNumber } from "shared/ui/ColoredNumber/ColoredNumber";
import { OutsideClickWrapper } from "widgets/OutsideClickWrapper/OutsideClickWrapper";
import { PopupList } from "shared/ui/PopupList/PopupList";

import { TFavorite, useGetOneFavoriteQuery } from "entities/Favorite";
import { selectUser } from "entities/User";
import { RatingChangeNumbers } from "./RatingChangeNumbers";

interface RatingChangeProps {
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
}

export const RatingChange = ({ filmId, updateFavorite, disabled }: RatingChangeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);

    const user = useAppSelector(selectUser);
    const { currentData: favorite } = useGetOneFavoriteQuery(filmId, { skip: !user });
    const userScore = favorite?.userScore ?? null;

    const onClose = () => {
        setIsOpen(false);
        setIsChange(false);
    };

    const onToggle = () => setIsOpen((p) => !p);

    const onStartChange = () => {
        setIsChange(true);
        setIsOpen(false);
    };

    const onUpdateScore = (userScore: number | null) => {
        updateFavorite({ userScore });
        onClose();
    };

    const options = [
        { action: onStartChange, title: "Изменить", Icon: <Change /> },
        { action: () => onUpdateScore(null), title: "Удалить", Icon: <Trashcan /> },
    ];

    return userScore ? (
        <div className="relative w-full">
            <OutsideClickWrapper onClose={onClose}>
                {isChange ? (
                    <RatingChangeNumbers onSetScore={onUpdateScore} />
                ) : (
                    <Button
                        disabled={disabled}
                        theme="regular"
                        onClick={onToggle}
                        className={classNames(
                            "sm:text-sm rounded-full justify-center gap-4 w-full",
                            {
                                ["pointer-events-none"]: isChange,
                            }
                        )}
                    >
                        <p className="whitespace-nowrap">Ваша оценка</p>
                        <ColoredNumber
                            className="w-6 h-6 rounded-full text-sm font-bold text-white shrink-0"
                            coloredBackground
                            number={userScore}
                        />
                    </Button>
                )}

                <PopupList
                    transitionValue={isOpen}
                    className="absolute top-0 left-0 w-40"
                    itemCount={options.length}
                    render={({ index, style }) => (
                        <Button onClick={options[index].action} theme="popup" style={style}>
                            <span>{options[index].title}</span>
                            <span>{options[index].Icon}</span>
                        </Button>
                    )}
                />
            </OutsideClickWrapper>
        </div>
    ) : null;
};
