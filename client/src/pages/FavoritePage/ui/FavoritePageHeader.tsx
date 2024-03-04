import { useAppDispatch } from "app/store";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Heading } from "shared/ui/Text/Heading";

import { ControllsBox } from "shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "shared/ui/Boxes/HeaderWithControlls";

import { favoritePageActions } from "../model/slice";
import { FavoriteListVariantT } from "../model/types";

import { memo, useMemo } from "react";
import { Button } from "shared/ui/Button/Button";

import { useGetSyncDataQuery } from "entities/Favorite";
import { listVariants } from "../model/data";
import { useTranslation } from "react-i18next";

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
            <Heading headinglevel={1}>{t("favoriteList")}</Heading>
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
