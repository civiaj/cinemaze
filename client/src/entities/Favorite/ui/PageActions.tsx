import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { TFavorite } from "@/entities/Favorite";
import { selectUser } from "@/entities/User";
import { AddBookmark, Bookmarked, Copy, Dots, Hide, Show } from "@/shared/assets/icons";
import { copyClipboard } from "@/shared/lib/copyClipboard";
import { Button } from "@/shared/ui/Button/Button";
import { PopupList } from "@/shared/ui/PopupList/PopupList";
import { Text } from "@/shared/ui/Text/Text";
import { OutsideClickWrapper } from "@/widgets/OutsideClickWrapper/OutsideClickWrapper";
import { useGetOneFavoriteQuery } from "../model/userFilmsApi";



type Props = {
    filmId: number;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
};

export const PageActions = ({ filmId, updateFavorite, disabled }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen((p) => !p);
    const { t } = useTranslation();

    const user = useAppSelector(selectUser);
    const { currentData: favorite } = useGetOneFavoriteQuery(filmId, { skip: !user });

    const onTogglProperty = (property: "hidden" | "bookmarked") => {
        updateFavorite({ [property]: !favorite?.[property] ?? true });
        onClose();
    };

    const handleCopy = async () => {
        await copyClipboard(window.location.href);
        onClose();
    };

    const bookmarked = favorite?.bookmarked ?? false;
    const hidden = favorite?.hidden ?? false;
    const options = [
        {
            action: handleCopy,
            title: t("details.copy"),
            Icon: <Copy />,
        },
        {
            action: () => onTogglProperty("hidden"),
            title: hidden ? t("details.show") : t("details.hide"),
            Icon: hidden ? <Show /> : <Hide />,
        },
    ];

    return (
        <div className="flex gap-4">
            <Button
                disabled={disabled}
                onClick={() => onTogglProperty("bookmarked")}
                theme="regular"
                className="rounded-full gap-2 sm:gap-4 px-4"
            >
                {bookmarked ? <Bookmarked className="text-blue-500" /> : <AddBookmark />}
                <Text>{t("details.will-watch")}</Text>
            </Button>

            <OutsideClickWrapper onClose={onClose}>
                <Button
                    disabled={disabled}
                    onClick={onToggle}
                    theme="regularIcon"
                    className="rounded-full"
                >
                    <Dots />
                </Button>
                <div className="relative">
                    <PopupList
                        transitionValue={isOpen}
                        className="absolute top-0 right-0 w-48 sm:left-0"
                        itemCount={options.length}
                        render={({ index, style }) => (
                            <Button onClick={options[index].action} theme="popup" style={style}>
                                {options[index].title}
                                {options[index].Icon}
                            </Button>
                        )}
                    />
                </div>
            </OutsideClickWrapper>
        </div>
    );
};
