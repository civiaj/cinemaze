import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/app/store";
import { FavoriteListVariantT, useGetSyncDataQuery } from "@/entities/Favorite";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { ControllsBox } from "@/shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "@/shared/ui/Boxes/HeaderWithControlls";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { listVariants } from "../model/data";
import { favoritePageActions } from "../model/slice";

type Props = {
    listVariant: FavoriteListVariantT;
};

export const FavoritePageHeader = memo(({ listVariant }: Props) => {
    const dispatch = useAppDispatch();
    const { currentData } = useGetSyncDataQuery();
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
        dispatch(favoritePageActions.setFavoriteList(newVariant as FavoriteListVariantT));
    };

    return (
        <HeaderWithControlls>
            <Heading headinglevel={1}>{t("favorite-t")}</Heading>
            <ControllsBox>
                <AppSelect
                    className="w-44"
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
                            <p className="line-clamp-1 break-words text-start flex justify-between w-full">
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
