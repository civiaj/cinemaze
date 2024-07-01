import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TFavorites, UpdateFavorite } from "@/entities/Film";
import { Change, Trashcan } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Button } from "@/shared/ui/Button/Button";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { PopupList } from "@/shared/ui/PopupList/PopupList";
import { RatingChangeNumbers } from "./RatingChangeNumbers";

interface RatingChangeProps {
    updateFavorite: UpdateFavorite;
    disabled: boolean;
    userScore: TFavorites["userScore"];
}

export const RatingChange = ({ userScore, updateFavorite, disabled }: RatingChangeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const { t } = useTranslation();

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
        updateFavorite({ userScore }, "userScore");
        onClose();
    };

    const options = [
        { action: onStartChange, title: t("details.change"), Icon: <Change /> },
        { action: () => onUpdateScore(null), title: t("details.delete"), Icon: <Trashcan /> },
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
                        <span className="whitespace-nowrap">{t("details.your-score")}</span>
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
