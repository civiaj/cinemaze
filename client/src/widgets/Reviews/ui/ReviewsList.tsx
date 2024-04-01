import { Box } from "shared/ui/Boxes/Box";
import { ReviewT } from "../model/types";
import { ReviewsItem } from "./ReviewsItem";
import { Text } from "shared/ui/Text/Text";

interface ReviewsList {
    items: ReviewT[];
}

export const ReviewsList = ({ items }: ReviewsList) => {
    if (!items.length) {
        return (
            <Box>
                <Text className="self-center">Ничего не найдено</Text>
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
