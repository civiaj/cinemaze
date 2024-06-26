import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { ControllsBox } from "@/shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "@/shared/ui/Boxes/HeaderWithControlls";
import { Heading } from "@/shared/ui/Text/Heading";
import { headerTitles, mainQueryOptions } from "../model/data";
import { getMainQuery } from "../model/selectors";
import { mainPageActions } from "../model/slice";
import { MainQueryT } from "../model/types";

export const MainPageHeader = () => {
    const mainQuery = useAppSelector(getMainQuery);
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const onMainQueryChange = (newQuery: string) => {
        dispatch(mainPageActions.setMainQuery(newQuery as MainQueryT));
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
