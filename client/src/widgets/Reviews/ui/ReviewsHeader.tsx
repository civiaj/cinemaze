import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { ReviewSortT } from "../model/types";
import { reviewTypeOptions } from "../model/data";
import { Heading } from "shared/ui/Text/Heading";
import { HeaderWithControlls } from "shared/ui/Boxes/HeaderWithControlls";
import { ControllsBox } from "shared/ui/Boxes/ControllsBox";
import { useTranslation } from "react-i18next";

interface ReviewHeaderProps {
    onChangeTypeOption: (newValue: string) => void;
    type: ReviewSortT;
    isLoading: boolean;
}

export const ReviewsHeader = (props: ReviewHeaderProps) => {
    const { onChangeTypeOption, type, isLoading } = props;
    const { t } = useTranslation();

    return (
        <HeaderWithControlls>
            <Heading headinglevel={3}>{t("details.reviews-t")}</Heading>
            <ControllsBox>
                <AppSelect
                    options={reviewTypeOptions}
                    actionChange={onChangeTypeOption}
                    value={type}
                    disabled={isLoading}
                />
            </ControllsBox>
        </HeaderWithControlls>
    );
};
