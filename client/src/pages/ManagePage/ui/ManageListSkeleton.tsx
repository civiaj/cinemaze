import { Box } from "@/shared/ui/Boxes/Box";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

export const ManageListSkeleton = () => {
    return (
        <Box>
            <Skeleton className="h-10 w-40" />

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full" />
                ))}
            </div>
        </Box>
    );
};
