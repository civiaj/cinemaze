import { useTranslation } from "react-i18next";
import { Box } from "@/shared/ui/Boxes/Box";
import { Text } from "@/shared/ui/Text/Text";
import { ReviewT } from "../../model/types";
import { ReviewsItem } from "./ReviewsItem";

interface ReviewsList {
    items: ReviewT[];
}

export const ReviewsList = ({ items }: ReviewsList) => {
    const { t } = useTranslation();

    if (!items.length) {
        return (
            <Box>
                <Text className="self-center">{t("details.reviews-empty")}</Text>
            </Box>
        );
    }

    return (
        <ul className="flex flex-col gap-4">
            {items.map((item) => (
                <ReviewsItem item={item} key={item.kinopoiskId} />
            ))}
        </ul>
    );
};
