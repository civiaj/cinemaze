import { useDetailsQuery } from "../../../pages/DetailsPage/model/detailsApi";
import { Text } from "shared/ui/Text/Text";

interface DescriptionProps {
    filmId: number;
}

export const Description = ({ filmId }: DescriptionProps) => {
    const { currentData } = useDetailsQuery(filmId);

    if (!currentData?.description)
        return (
            <div className="h-7 flex items-center justify-center">
                <Text>Обзор недоступен</Text>
            </div>
        );

    return <Text as="p">{currentData.description}</Text>;
};
