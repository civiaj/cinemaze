import { useGetStatisticsQuery } from "entities/Favorite";
import { FavoritePieChart } from "pages/StatisticsPage/ui/FavoritePieChart";
import { FavoriteTimelineChart } from "pages/StatisticsPage/ui/FavoriteTimelineChart";
import { FavoriteVerticalBarChart } from "pages/StatisticsPage/ui/FavoriteVerticalBarChart";
import { Box } from "shared/ui/Boxes/Box";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

export const StatisticsPageBody = () => {
    const { data, isLoading } = useGetStatisticsQuery();

    if (isLoading)
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

    if (!data?.length) return "pusta";
    return (
        <>
            <FavoritePieChart />
            <FavoriteVerticalBarChart />
            <FavoriteTimelineChart />
        </>
    );
};
