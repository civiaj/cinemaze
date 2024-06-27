import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text/Text";
import { useDetailsQuery } from "../model/filmApi";

interface DescriptionProps {
    id: number;
}

export const Description = ({ id }: DescriptionProps) => {
    const { currentData } = useDetailsQuery(id);
    const { t } = useTranslation();

    if (!currentData?.description)
        return (
            <div className="h-7 flex items-center justify-center">
                <Text>{t("details.descr-empty")}</Text>
            </div>
        );

    return <Text as="p">{currentData.description}</Text>;
};
