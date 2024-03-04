import { useGetStatisticsQuery } from "entities/Favorite";
import { PageError } from "entities/Ui";
import { FavoritePieChart } from "pages/StatisticsPage/ui/FavoritePieChart";
import { FavoriteTimelineChart } from "pages/StatisticsPage/ui/FavoriteTimelineChart";
import { FavoriteVerticalBarChart } from "pages/StatisticsPage/ui/FavoriteVerticalBarChart";
import { StatisticsSkeleton } from "pages/StatisticsPage/ui/StatisticsSkeleton";
import formatFilmError from "shared/api/helpers/formatFilmError";
import { Box } from "shared/ui/Boxes/Box";
import { Text } from "shared/ui/Text/Text";

export const StatisticsPageBody = () => {
    const { data, isLoading, isError, error } = useGetStatisticsQuery();

    if (isLoading) return <StatisticsSkeleton />;

    let message: string | null = null;
    if (error) message = formatFilmError(error);
    if (isError) return <PageError message={message} />;
    if (!data?.length)
        return (
            <Box>
                <Text className="font-medium text-center">Нет элементов для отображения.</Text>
            </Box>
        );

    return (
        <>
            <StatisticsSkeleton />
            <FavoritePieChart />
            <FavoriteVerticalBarChart />
            <FavoriteTimelineChart />
        </>
    );
};
