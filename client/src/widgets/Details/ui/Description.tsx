import { useTranslation } from "react-i18next";
import { useDetailsQuery } from "pages/DetailsPage";
import { Text } from "shared/ui/Text/Text";

interface DescriptionProps {
    filmId: number;
}

export const Description = ({ filmId }: DescriptionProps) => {
    const { currentData } = useDetailsQuery(filmId);
    const { t } = useTranslation();

    if (!currentData?.description)
        return (
            <div className="h-7 flex items-center justify-center">
                <Text>{t("details.descr-empty")}</Text>
            </div>
        );

    return <Text as="p">{currentData.description}</Text>;
};
