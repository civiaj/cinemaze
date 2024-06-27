import { useTranslation } from "react-i18next";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { ControllsBox } from "@/shared/ui/Boxes/ControllsBox";
import { HeaderWithControlls } from "@/shared/ui/Boxes/HeaderWithControlls";
import { Heading } from "@/shared/ui/Text/Heading";
import { reviewTypeOptions } from "../../model/data";
import { TReviewsSort } from "../../model/types";

interface ReviewHeaderProps {
    onChangeTypeOption: (newValue: string) => void;
    type: TReviewsSort;
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
