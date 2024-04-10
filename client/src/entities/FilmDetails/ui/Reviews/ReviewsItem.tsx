import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { formatDate } from "@/shared/lib/formatDate";
import { Box } from "@/shared/ui/Boxes/Box";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { ReviewT } from "../../model/types";

interface ReviewsItemProps {
    item: ReviewT;
}

export const ReviewsItem = memo(({ item }: ReviewsItemProps) => {
    const { author, date, description, negativeRating, positiveRating, title, type } = item;
    const [showMore, setShowMore] = useState(false);
    const { t, i18n } = useTranslation();

    const onShowMore = () => setShowMore(true);

    return (
        <li>
            <Box className="gap-0">
                <div
                    className={classNames(
                        "flex items-center justify-between py-1 px-2 md:px-4 rounded-xl",
                        {
                            ["bg-my-green-200"]: type === "POSITIVE",
                            ["bg-my-red-200"]: type === "NEGATIVE",
                            ["bg-my-neutral-300"]: type === "NEUTRAL",
                        }
                    )}
                >
                    <span className="text-sm font-bold">{author}</span>
                    <span className="font-normal text-xs">
                        {formatDate(new Date(date), i18n.language, "long")}
                    </span>
                </div>
                <div className="py-2 flex flex-col gap-1 ">
                    {title && <Heading headinglevel={4}>{title}</Heading>}
                    <p
                        dangerouslySetInnerHTML={{ __html: description }}
                        className={classNames(
                            "whitespace-pre-wrap break-words line-clamp-6 text-inde text-sm sm:text-base",
                            {
                                ["line-clamp-none"]: showMore,
                            }
                        )}
                    ></p>
                    <div
                        className={classNames("flex justify-between items-center w-full", {
                            ["justify-end"]: showMore,
                        })}
                    >
                        {!showMore && (
                            <Button
                                theme="regular"
                                onClick={onShowMore}
                                className="text-sm h-auto py-1"
                            >
                                {t("btn.view-whole-review")}
                            </Button>
                        )}

                        <div className="flex gap-4">
                            <span className="flex items-center gap-1">
                                <ArrowUp className="text-xl text-my-neutral-500" />
                                <span className="text-my-green-500 font-bold text-sm">
                                    {positiveRating}
                                </span>
                            </span>
                            <span className="flex items-center gap-1">
                                <ArrowDown className="text-xl text-my-neutral-500" />
                                <span className="text-my-red-500 font-bold text-sm">
                                    {negativeRating}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </Box>
        </li>
    );
});
