import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useGetStatisticsQuery } from "@/entities/Favorite";
import { FavoritePieChart } from "@/pages/StatisticsPage/ui/FavoritePieChart";
import { FavoriteTimelineChart } from "@/pages/StatisticsPage/ui/FavoriteTimelineChart";
import { FavoriteVerticalBarChart } from "@/pages/StatisticsPage/ui/FavoriteVerticalBarChart";
import { StatisticsSkeleton } from "@/pages/StatisticsPage/ui/StatisticsSkeleton";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { Box } from "@/shared/ui/Boxes/Box";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";

export const StatisticsPageBody = () => {
    const { data, isLoading, isError, error } = useGetStatisticsQuery();
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (isLoading) return <StatisticsSkeleton />;

    if (isError)
        return <StatusBox msgOrChildren={formatFilmError(error)} isError={isError} reload />;

    if (!data?.some((film) => film.userScore))
        return (
            <Box className="items-center text-center">
                <Text>{t("stat.empty-msg")}</Text>

                <Button onClick={() => navigate(routePath.main)} theme="regular">
                    {t("btn.main")}
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
