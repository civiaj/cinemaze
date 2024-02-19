import { Message } from "shared/ui/Text/Message";
import { useDetailsQuery } from "../../../pages/DetailsPage/model/detailsApi";
import { Text } from "shared/ui/Text/Text";

interface DescriptionProps {
    filmId: number;
}

export const Description = ({ filmId }: DescriptionProps) => {
    const { currentData } = useDetailsQuery(filmId);

    if (!currentData?.description)
        return (
            <div className="h-20 flex items-center justify-center">
                <Message message="Обзор недоступен." />
            </div>
        );

    return <Text as="p">{currentData.description}</Text>;
};
