import { Box } from "shared/ui/Boxes/Box";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

export const StatisticsSkeleton = () => {
    return (
        <>
            <Box>
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </Box>
            <Box>
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </Box>
        </>
    );
};
