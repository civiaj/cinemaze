import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    TTopCategories,
    filmActions,
    getMainQuery,
    headerTitles,
    mainQueryOptions,
} from "@/entities/Film";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { ControllsBox } from "@/shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "@/shared/ui/Boxes/HeaderWithControlls";
import { Heading } from "@/shared/ui/Text/Heading";

export const MainPageHeader = () => {
    const mainQuery = useAppSelector(getMainQuery);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onMainQueryChange = (newQuery: string) => {
        dispatch(filmActions.setMainQuery(newQuery as TTopCategories));
    };

    return (
        <HeaderWithControlls>
            <Heading headinglevel={1}>{t(headerTitles[mainQuery])}</Heading>
            <ControllsBox>
                <AppSelect
                    className="w-40"
                    options={mainQueryOptions}
                    value={mainQuery}
                    actionChange={onMainQueryChange}
                />
            </ControllsBox>
        </HeaderWithControlls>
    );
};
