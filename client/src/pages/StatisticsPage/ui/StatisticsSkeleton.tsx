import { Box } from "shared/ui/Boxes/Box";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

export const StatisticsSkeleton = () => {
    return (
        <>
            <Box>
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-72" />
            </Box>
            <Box>
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-96" />
            </Box>
            <Box>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-72" />
            </Box>
        </>
    );
};
