import { routePath } from "app/router/router";
import { TFavorite, useRemoveOneFavoriteMutation } from "entities/Favorite";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Checked } from "shared/assets/icons";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { Overlay } from "shared/ui/Boxes/Overlay";
import { Button } from "shared/ui/Button/Button";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";
import { listVariants } from "../model/data";
import { FavoriteListVariantT } from "../model/types";
import { useHideScroll } from "shared/hooks/useHideScroll";
import { useTranslation } from "react-i18next";

type Props = {
    onClose: () => void;
    listVariant: FavoriteListVariantT;
    film?: (FilmT & TFavorite) | null;
};

export const FavoriteRemoveModal = (props: Props) => {
    const { t } = useTranslation("favoritePage");
    const { onClose, listVariant, film } = props;
    const { nameEn, nameRu, nameOriginal, filmId } = film ?? {};
    const title = nameRu ?? nameEn ?? nameOriginal;
    const category = listVariants.find((e) => e.value === listVariant)!.label;

    const [all, setAll] = useState(false);
    const toggleAll = () => setAll((p) => !p);

    const [removeOneFavorite, { isLoading }] = useRemoveOneFavoriteMutation();

    useHideScroll();

    const onDelete = async () => {
        if (!filmId) return;
        await removeOneFavorite({
            body: { filmId, field: all ? "all" : listVariant },
            listVariant: all ? "all" : listVariant,
            filmTitle: title,
        });
        onClose();
    };
    const link = `${routePath.details}/${film?.filmId}`;

    return createPortal(
        <Overlay className="mt-0">
            <OutsideClickWrapper className="max-w-3xl flex-1 p-4" onClose={onClose}>
                <Box className="p-4">
                    <div className="flex flex-col gap-2">
                        <Heading headinglevel={1}>{t("Deletion")}</Heading>
                        <div>
                            <Text as="span" className="text-start">
                                {t("delete-msg")}{" "}
                            </Text>
                            {title ? (
                                <AppLink
                                    className="hover:underline hover:text-my-neutral-700 text-blue-500 "
                                    to={link}
                                >
                                    {title}
                                </AppLink>
                            ) : (
                                <Text as="span">{t("Film")}</Text>
                            )}
                            <Text as="span"> {t("delete-msg-from")} </Text>
                            <Text as="span" className="font-medium">
                                {t(category)}
                            </Text>
                            ?
                        </div>
                    </div>
                    {listVariant !== "all" && (
                        <label className="flex items-center gap-4 cursor-pointer self-start hover:underline relative">
                            <input
                                className="appearance-none checked:bg-blue-500 cursor-pointer w-4 h-4 text-blue-500 bg-my-neutral-300 rounded focus:ring-blue-500 peer outline-none focus:ring-2 "
                                type="checkbox"
                                checked={all}
                                onChange={toggleAll}
                            />
                            Удалить из всех списков
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 hidden peer-checked:block">
                                <Checked className="text-my-neutral-50" />
                            </span>
                        </label>
                    )}
                    <div className="self-end flex items-center justify-center gap-2">
                        <Button
                            className="font-medium"
                            theme="danger"
                            onClick={onDelete}
                            isLoading={isLoading}
                        >
                            {t("Delete")}
                        </Button>
                        <Button onClick={onClose} theme="regular" className="font-medium">
                            {t("Cancel")}
                        </Button>
                    </div>
                </Box>
            </OutsideClickWrapper>
        </Overlay>,
        document.getElementById("root")!
    );
};
