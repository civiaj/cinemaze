import { ReviewT } from "../model/types";
import { ReviewsItem } from "./ReviewsItem";

interface ReviewsList {
    items: ReviewT[];
}

export const ReviewsList = ({ items }: ReviewsList) => {
    return (
        items?.length && (
            <ul className="flex flex-col gap-4">
                {items.map((item) => (
                    <ReviewsItem item={item} key={item.kinopoiskId} />
                ))}
            </ul>
        )
    );
};
