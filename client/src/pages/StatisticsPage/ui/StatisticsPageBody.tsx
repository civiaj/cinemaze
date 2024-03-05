import { routePath } from "app/router/router";
import { useGetStatisticsQuery } from "entities/Favorite";
import { PageError } from "entities/Ui";
import { FavoritePieChart } from "pages/StatisticsPage/ui/FavoritePieChart";
import { FavoriteTimelineChart } from "pages/StatisticsPage/ui/FavoriteTimelineChart";
import { FavoriteVerticalBarChart } from "pages/StatisticsPage/ui/FavoriteVerticalBarChart";
import { StatisticsSkeleton } from "pages/StatisticsPage/ui/StatisticsSkeleton";
import { useNavigate } from "react-router-dom";
import formatFilmError from "shared/api/helpers/formatFilmError";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

export const StatisticsPageBody = () => {
    const { data, isLoading, isError, error } = useGetStatisticsQuery();
    const navigate = useNavigate();

    if (isLoading) return <StatisticsSkeleton />;

    let message: string | null = null;
    if (error) message = formatFilmError(error);
    if (isError) return <PageError message={message} />;

    if (!data?.length)
        return (
            <Box className="items-center text-center">
                <Text>Для просмотра статистики добавьте или оцените несколько фильмов.</Text>

                <Button onClick={() => navigate(routePath.main)} theme="regular">
                    Перейти на главную
                </Button>
            </Box>
        );

    return (
        <>
            <FavoritePieChart />
            <FavoriteVerticalBarChart />
            <FavoriteTimelineChart />
        </>
    );
};
