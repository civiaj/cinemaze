import { TAppearances } from "@/entities/Ui";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

type Props = {
    appearance: TAppearances;
    cardStyles?: TCardStyles;
};

export const FilmCardSkeleton = (props: Props) => {
    const { appearance, cardStyles } = props;

    if (appearance === "tile")
        return (
            <li className={classNames("relative overflow-hidden h-72", {}, [cardStyles?.card])}>
                <Skeleton className="w-full h-full bg-my-neutral-100 rounded-none" />
                <Skeleton
                    className={classNames(
                        "absolute bottom-2 left-2 h-7 w-[70%] bg-my-neutral-200",
                        {},
                        [cardStyles?.title]
                    )}
                />

                <Skeleton className="w-8 h-6 absolute top-2 right-2 bg-my-neutral-200" />
            </li>
        );

    if (appearance === "list")
        return (
            <Box>
                <div className="flex gap-2 sm:gap-4">
                    <Skeleton className="h-52 w-36" />
                    <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-7 w-1/3" />
                        <div className="flex-1 flex flex-col gap-1">
                            <Skeleton className="h-5 w-1/4" />
                            <Skeleton className="h-5 w-1/2" />
                        </div>
                        <div className="flex justify-between gap-2">
                            <ul className="gap-1 flex self-end flex-wrap">
                                {Array.from({ length: 3 }, (_, i) => i).map((v) => (
                                    <Skeleton
                                        className="rounded-full h-6 w-16 md:h-7 md:w-24"
                                        key={v}
                                    ></Skeleton>
                                ))}
                            </ul>
                            <Skeleton className="self-end h-10 w-24 shrink-0 hidden sm:block" />
                        </div>
                    </div>
                </div>
                <Skeleton className="block sm:hidden h-10 w-full" />
            </Box>
        );

    return null;
};
