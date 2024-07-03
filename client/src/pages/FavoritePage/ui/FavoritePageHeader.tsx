import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/app/store";
import { TFavoritesListVariants, filmActions, useGetStatsTotalQuery } from "@/entities/Film";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { ControllsBox } from "@/shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "@/shared/ui/Boxes/HeaderWithControlls";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { listVariants } from "../model/data";

type Props = {
    listVariant: TFavoritesListVariants;
};

export const FavoritePageHeader = memo(({ listVariant }: Props) => {
    const dispatch = useAppDispatch();
    const { currentData } = useGetStatsTotalQuery();
    const { t } = useTranslation();

    const options = useMemo(
        () =>
            listVariants.map((variant) => {
                const stat = !currentData
                    ? null
                    : currentData[variant.value] > 99
                    ? "+99"
                    : currentData[variant.value];

                return {
                    ...variant,
                    stat,
                };
            }),
        [currentData]
    );

    const onListVariantChange = (newVariant: string) => {
        if (listVariant === newVariant) return;
        dispatch(filmActions.setFavoriteQuery(newVariant as TFavoritesListVariants));
    };

    return (
        <HeaderWithControlls>
            <Heading headinglevel={1}>{t("favorite-t")}</Heading>
            <ControllsBox>
                <AppSelect
                    className="w-48"
                    options={options}
                    value={listVariant}
                    render={({ index, style }, onClose) => (
                        <Button
                            onClick={() => {
                                onListVariantChange(String(options[index].value));
                                onClose();
                            }}
                            theme="popup"
                            style={style}
                        >
                            <p className="line-clamp-1 break-words text-start flex justify-between w-full items-center">
                                {t(options[index].label)}
                                {
                                    <span className="text-blue-500 font-medium text-xs">
                                        {options[index].stat}
                                    </span>
                                }
                            </p>
                        </Button>
                    )}
                />
            </ControllsBox>
        </HeaderWithControlls>
    );
});
