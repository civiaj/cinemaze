import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { formatDate } from "@/shared/lib/formatDate";
import { Box } from "@/shared/ui/Boxes/Box";
import { ModalInProgress } from "@/shared/ui/Boxes/Modal.InProgress";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { ReviewT } from "../../model/types";

interface ReviewsItemProps {
    item: ReviewT;
}

export const ReviewsItem = memo(({ item }: ReviewsItemProps) => {
    const { author, date, description, negativeRating, positiveRating, title, type } = item;
    const [showMore, setShowMore] = useState(false);
    const { t, i18n } = useTranslation();
    const [isModal, setModal] = useState(false);
    const onCloseModal = () => setModal(false);
    const onOpenModal = () => setModal(true);

    const onShowMore = () => setShowMore(true);

    return (
        <>
            <li>
                <Box className="sm:p-0 p-0 gap-0 sm:gap-0 overflow-hidden">
                    <div className="grid grid-cols-[4px,_auto]">
                        <div
                            className={classNames("w-full h-full", {
                                ["bg-my-green-500"]: type === "POSITIVE",
                                ["bg-my-red-500"]: type === "NEGATIVE",
                                ["bg-my-neutral-300"]: type === "NEUTRAL",
                            })}
                        />
                        <div
                            className={classNames("w-full h-full", {
                                ["bg-my-green-50"]: type === "POSITIVE",
                                ["bg-my-red-50"]: type === "NEGATIVE",
                                ["bg-my-neutral-100"]: type === "NEUTRAL",
                            })}
                        >
                            <UserBox className="gap-0 sm:gap-0">
                                <Text className="font-medium">{author}</Text>
                                <Text className="text-sm sm:text-sm text-my-neutral-500">
                                    {formatDate(new Date(date), i18n.language, "long")}
                                </Text>
                            </UserBox>
                            <UserBoxSeparator />
                            <UserBox>
                                {title && <Heading headinglevel={4}>{title}</Heading>}
                                <p
                                    dangerouslySetInnerHTML={{ __html: description }}
                                    className={classNames(
                                        "whitespace-pre-wrap break-words line-clamp-6 sm:text-base text-sm",
                                        {
                                            ["line-clamp-none"]: showMore,
                                        }
                                    )}
                                ></p>
                            </UserBox>
                            <UserBoxSeparator />
                            <UserBox
                                className={classNames(
                                    "vsm:flex-row justify-between items-center bg-my-white",
                                    {
                                        ["justify-end"]: showMore,
                                    }
                                )}
                            >
                                {!showMore && (
                                    <Button
                                        theme="regularNav"
                                        onClick={onShowMore}
                                        className="h-auto py-1 border border-border"
                                    >
                                        {t("btn.view-whole-review")}
                                    </Button>
                                )}
                                <div className="flex gap-2">
                                    <div className="flex items-center justify-center gap-1">
                                        <Button
                                            onClick={onOpenModal}
                                            theme="regularNavIcon"
                                            className="border border-border rounded-full"
                                        >
                                            <ArrowUp className="text-xl" />
                                        </Button>
                                        <span className="text-my-green-500 font-bold text-sm">
                                            {positiveRating}
                                        </span>
                                        <span>/</span>
                                        <span className="text-my-red-500 font-bold text-sm">
                                            {negativeRating}
                                        </span>
                                        <Button
                                            onClick={onOpenModal}
                                            theme="regularNavIcon"
                                            className="border border-border rounded-full"
                                        >
                                            <ArrowDown className="text-xl" />
                                        </Button>
                                    </div>
                                </div>
                            </UserBox>
                        </div>
                    </div>
                </Box>
                {isModal && <ModalInProgress onClose={onCloseModal} />}
            </li>
        </>
    );
});
