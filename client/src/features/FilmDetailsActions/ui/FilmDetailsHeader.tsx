import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TDetails, UpdateFavorite } from "@/entities/Film";
import { AddBookmark, Bookmarked, Copy, Dots, Hide, Show } from "@/shared/assets/icons";
import { copyClipboard } from "@/shared/lib/copyClipboard";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Button } from "@/shared/ui/Button/Button";
import { PopupList } from "@/shared/ui/PopupList/PopupList";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    details: Pick<TDetails, "year" | "nameOriginal" | "ratingAgeLimits" | "favorite"> & {
        label: string;
    };
    updateFavorite: UpdateFavorite;
    disabled: boolean;
};

export const FilmDetailsHeader = ({ details, updateFavorite, disabled }: Props) => {
    const { ratingAgeLimits, year, nameOriginal, label, favorite } = details;
    const { bookmarked, hidden } = favorite ?? {};
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen((p) => !p);
    const { t } = useTranslation();

    const onTogglProperty = (property: "hidden" | "bookmarked") => {
        updateFavorite({ [property]: !favorite?.[property] ?? true }, property);
        onClose();
    };

    const handleCopy = async () => {
        await copyClipboard(window.location.href);
        onClose();
    };

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
        <header className="flex flex-col absolute top-2 left-2 gap-2 vsm:gap-4 vsm:static z-[1] p-2 vsm:p-0">
            <div className="flex flex-col">
                <Heading headinglevel={1} className="text-neutral-50 vsm:text-inherit">
                    {label} ({year})
                </Heading>
                {nameOriginal && (
                    <span className="text-neutral-200 vsm:text-my-neutral-500">
                        {nameOriginal} {ratingAgeLimits && <span>{ratingAgeLimits}</span>}
                    </span>
                )}
            </div>
            <div className="flex gap-2">
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
                            className="absolute top-0 right-0 w-56 sm:left-0"
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
        </header>
    );
};
