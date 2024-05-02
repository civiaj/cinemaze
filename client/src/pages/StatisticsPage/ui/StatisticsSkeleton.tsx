import { Fragment } from "react";
import { Box } from "@/shared/ui/Boxes/Box";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

export const StatisticsSkeleton = () => {
    return (
        <>
            <Box>
                <Skeleton className="h-8 w-1/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-7 w-20" />
                </div>
                <Skeleton className="h-[250px] w-[250px] rounded-full self-center" />
            </Box>
            <Box>
                <div className="flex justify-between">
                    <Skeleton className="h-8 w-1/5" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div>
                    <div className="grid gap-4 grid-cols-[1fr,5fr] place-items-end shrink-0">
                        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
                            <Fragment key={index}>
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-full" />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Box>
            <Box>
                <div className="flex justify-between">
                    <Skeleton className="h-8 w-1/5" />
                    <Skeleton className="h-10 w-40" />
                </div>
                <div>
                    <div className="flex gap-4">
                        <div className="flex flex-col justify-between gap-2">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="w-5 h-5" />
                        </div>
                        <Skeleton className="w-full h-48" />
                    </div>
                </div>
            </Box>
        </>
    );
};
