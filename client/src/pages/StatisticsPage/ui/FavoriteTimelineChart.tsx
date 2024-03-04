import { routePath } from "app/router/router";
import { useAppDispatch, useAppSelector } from "app/store";
import { useTheme } from "app/theme";
import { useGetStatisticsQuery } from "entities/Favorite";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Box } from "shared/ui/Boxes/Box";
import { Heading } from "shared/ui/Text/Heading";

import { ANIMATION_BEGIN, ANIMATION_DURATION, BLUE, COLORS, MARGIN } from "../model/config";
import { tlIntervals } from "../model/data";
import { getSelectByDate, getTL } from "../model/selectors";
import { statisticsActions } from "../model/slice";
import { TLIntervals, TLStat } from "../model/types";

const CustomTooltip = ({ payload, active }: TooltipProps<TLStat["userScore"], TLStat["date"]>) => {
    const { t } = useTranslation();
    if (active && payload && payload.length) {
        const item = payload[0].payload as TLStat;

        return (
            <div className="bg-my-neutral-50 bg-opacity-10 px-6 py-4 flex items-end flex-col">
                <AppLink
                    to={`${routePath.details}/${item.filmId}`}
                    className="font-medium text-xl pointer-events-auto text-my-neutral-800 hover:text-blue-500"
                >
                    {item.name} {item.year && <span>({item.year})</span>}
                </AppLink>
                <div className="flex gap-2 items-center text-base font-normal">
                    <p>
                        {item.userScore} <span>{t("stars", { count: item.userScore })}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export const FavoriteTimelineChart = () => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const [tooltip, setTooltip] = useState<"hover" | "click">("hover");
    const onToggleTooltip = () => setTooltip((p) => (p === "click" ? "hover" : "click"));
    const { interval } = useAppSelector(getTL);
    const dispatch = useAppDispatch();
    const selectByDate = useMemo(() => getSelectByDate, []);
    const { data } = useGetStatisticsQuery(undefined, {
        selectFromResult: (result) => {
            return { data: selectByDate(result, interval, i18n.language) };
        },
    });

    const color = COLORS[theme];

    const onIntervalChange = (newValue: string) => {
        dispatch(statisticsActions.tlSetInterval(newValue as TLIntervals));
    };

    return (
        <Box>
            <div className="flex items-center gap-2 justify-between">
                <Heading headinglevel={1}>{t("Last ratings")}</Heading>
                <AppSelect
                    options={tlIntervals}
                    actionChange={onIntervalChange}
                    value={interval}
                    className="w-40"
                />
            </div>
            <div className="font-medium text-sm h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        onClick={onToggleTooltip}
                        width={500}
                        height={300}
                        data={data}
                        margin={MARGIN}
                    >
                        <CartesianGrid strokeDasharray="5 5" opacity={0.5} />
                        <XAxis
                            type="category"
                            dataKey="date"
                            tick={{ fill: color }}
                            tickCount={20}
                            tickLine={false}
                            dy={15}
                        />
                        <YAxis
                            domain={[0, 10]}
                            tickCount={20}
                            allowDecimals={false}
                            type="number"
                            tick={{ fill: color }}
                            dx={0}
                        />
                        <Tooltip
                            trigger={tooltip}
                            content={<CustomTooltip />}
                            animationDuration={ANIMATION_DURATION}
                        />

                        <Line
                            animationDuration={ANIMATION_DURATION}
                            animationBegin={ANIMATION_BEGIN}
                            type="natural"
                            dataKey="userScore"
                            activeDot={{ r: 5 }}
                            stroke={BLUE}
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
};
