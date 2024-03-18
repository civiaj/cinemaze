import { Box } from "shared/ui/Boxes/Box";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

export const DetailsPageSkeleton = () => {
    return (
        <>
            <Box className="flex-row sm:py-2 py-2 sm:gap-4 gap-4 h-12">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-20" />
            </Box>
            <Box>
                <div className="flex flex-col gap-x-4 sm:gap-x-6 vsm:grid vsm:grid-cols-8 relative">
                    <div className="col-span-3 mdb:col-span-2 flex flex-col gap-4">
                        <Skeleton className="aspect-[9/16] w-full" />
                        <Skeleton className="w-full h-10" />
                    </div>
                    <div className="flex-1 grid grid-cols-7 col-span-5 mdb:col-span-6">
                        <div className="flex flex-col col-span-7 mdb:col-span-5 gap-4">
                            <div className="flex flex-col absolute top-2 left-2 gap-2 vsm:gap-4 vsm:static z-[1]">
                                <div className="flex-col gap-1 hidden vsm:flex">
                                    <Skeleton className="w-3/4 h-7 sm:h-8" />
                                    <Skeleton className="w-1/2 h-6" />
                                </div>
                                <div className="hidden gap-4 vsm:flex">
                                    <Skeleton className="h-10 w-40" />
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 vsm:mt-0">
                                <Skeleton className="h-6 sm:h-7 w-36" />
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                    <Skeleton className="h-5" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-col gap-4 col-span-2 hidden mdb:flex">
                            <Skeleton className="h-9 w-14" />
                            <div className="flex gap-1 flex-col">
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                            <Skeleton className="w-full h-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </Box>
            <Box>
                <div className="flex gap-2">
                    <Skeleton className="h-8 sm:h-10 w-20" />
                    <Skeleton className="h-8 sm:h-10 w-40" />
                    <Skeleton className="h-8 sm:h-10 w-24" />
                </div>
                <Skeleton className="h-32 w-full" />
            </Box>
            <Box className="flex-row">
                <Skeleton className="h-60 w-44" />
                <Skeleton className="h-60 w-44" />
                <Skeleton className="h-60 w-44" />
            </Box>
        </>
    );
};
