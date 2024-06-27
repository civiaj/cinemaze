import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { TFavorite, useGetOneFavoriteQuery } from "@/entities/Favorite";
import { selectUser } from "@/entities/User";
import { User } from "@/shared/assets/icons";
import { RatingBox } from "@/shared/ui/Boxes/RatingBox";
import { Button } from "@/shared/ui/Button/Button";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";

interface RatingUserScoreProps {
    id: number;
    updateFavorite: (favorite: TFavorite) => Promise<void>;
    disabled: boolean;
}

export const RatingUserScore = ({ id, updateFavorite, disabled }: RatingUserScoreProps) => {
    const user = useAppSelector(selectUser);
    const { t } = useTranslation();
    const { currentData: favorite } = useGetOneFavoriteQuery(id, { skip: !user });

    const handleDeleteScore = () => {
        updateFavorite({ userScore: null });
    };

    const userScore = favorite?.userScore ?? null;

    return (
        userScore && (
            <RatingBox>
                <div className="flex items-center gap-2">
                    <User className="text-xl" />
                    <span className="font-medium">{t("details.your-score")}: </span>
                    <ColoredNumber
                        coloredBackground
                        className="w-6 h-6 rounded-full text-sm font-bold text-white shrink-0 block"
                        number={userScore}
                    />
                </div>
                <Button
                    disabled={disabled}
                    onClick={handleDeleteScore}
                    theme="regular"
                    className="text-sm px-4 py-1 justify-center h-auto"
                >
                    {t("btn.delete")}
                </Button>
            </RatingBox>
        )
    );
};
