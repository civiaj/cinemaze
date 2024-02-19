import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { ReviewSortT } from "../model/types";
import { reviewTypeOptions } from "../model/data";
import { Heading } from "shared/ui/Text/Heading";
import { HeaderWithControlls } from "shared/ui/Boxes/HeaderWithControlls";
import { ControllsBox } from "shared/ui/Boxes/ControllsBox";

interface ReviewHeaderProps {
    onChangeTypeOption: (newValue: string) => void;
    type: ReviewSortT;
    isLoading: boolean;
}

export const ReviewsHeader = (props: ReviewHeaderProps) => {
    const { onChangeTypeOption, type, isLoading } = props;

    return (
        <HeaderWithControlls>
            <Heading headinglevel={3}>Рецензии зрителей</Heading>
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
