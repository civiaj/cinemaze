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
import { routePath } from "@/app/router/router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useGetStatisticsQuery } from "@/entities/Favorite";
import { classNames } from "@/shared/lib/classNames";
import { useTheme } from "@/shared/theme";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Box } from "@/shared/ui/Boxes/Box";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { ANIMATION_BEGIN, ANIMATION_DURATION, BLUE, COLORS } from "../model/config";
import { tlIntervals } from "../model/data";
import { getSelectByDate, getTL } from "../model/selectors";
import { statisticsActions } from "../model/slice";
import { TLIntervals, TLStat } from "../model/types";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const CustomTooltip = ({ payload, active }: TooltipProps<TLStat["userScore"], TLStat["date"]>) => {
    const { t } = useTranslation();
    if (active && payload && payload.length) {
        const item = payload[0].payload as TLStat;
        return (
            <div className="max-w-[300px] overflow-hidden">
                <div className="bg-my-neutral-50 bg-opacity-10 px-4 py-2 sm:px-6 sm:py-4 flex flex-col">
                    <Elipsis>
                        <AppLink
                            to={`${routePath.details}/${item.filmId}`}
                            className="font-medium text-base sm:text-2xl pointer-events-auto text-my-neutral-800 hover:text-blue-500"
                            title={item.name}
                        >
                            {item.name}
                            {item.year && <span>({item.year})</span>}
                        </AppLink>
                    </Elipsis>
                    <div className="flex gap-2 items-center text-base font-normal self-end">
                        <p className="sm:text-base text-xs">
                            {item.userScore}{" "}
                            <span>{t("plural.star", { count: item.userScore })}</span>
                        </p>
                    </div>
                    <div className="font-normal self-end sm:text-base text-xs">{item.fullDate}</div>
                </div>
            </div>
        );
    }
    return null;
};

const CustomizedGroupTick = (props: any) => {
    const { x, y, payload, color } = props;

    return (
        <g fill={color}>
            <text dy={15} x={x} y={y} textAnchor="start" className="text-xs">
                {payload.value}
            </text>
        </g>
    );
};

export const FavoriteTimelineChart = () => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const [tooltip, setTooltip] = useState<"hover" | "click">("hover");
    const onToggleTooltip = () => setTooltip((p) => (p === "click" ? "hover" : "click"));
    const { interval } = useAppSelector(getTL);
    const dispatch = useAppDispatch();
    const selectByDate = useMemo(() => getSelectByDate, []);
    const { result } = useGetStatisticsQuery(undefined, {
        selectFromResult: (data) => {
            return { result: selectByDate(data, interval, i18n.language) };
        },
    });

    const color = COLORS[theme];

    const onIntervalChange = (newValue: string) => {
        dispatch(statisticsActions.tlSetInterval(newValue as TLIntervals));
    };

    return (
        <Box>
            <div className="flex items-center gap-2 justify-between">
                <Heading headinglevel={1}>{t("stat.last")}</Heading>
                <AppSelect
                    options={tlIntervals}
                    actionChange={onIntervalChange}
                    value={interval}
                    className="w-40"
                />
            </div>

            <div
                className={classNames("font-medium text-sm h-72 relative", {
                    ["pointer-events-none"]: result.length === 0,
                })}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        onClick={onToggleTooltip}
                        width={500}
                        height={300}
                        data={result}
                        margin={{ right: 15, top: 10, bottom: 10, left: 10 }}
                    >
                        <CartesianGrid opacity={0.2} />
                        <XAxis
                            dataKey="date"
                            tick={<CustomizedGroupTick color={color} />}
                            interval="equidistantPreserveStart"
                        />
                        <YAxis
                            domain={[0, 10]}
                            allowDecimals={false}
                            tickLine={false}
                            type="number"
                            tick={{ fill: color }}
                            width={15}
                        />
                        <Tooltip
                            trigger={tooltip}
                            content={<CustomTooltip />}
                            animationDuration={ANIMATION_DURATION}
                        />

                        <Line
                            animationDuration={ANIMATION_DURATION}
                            animationBegin={ANIMATION_BEGIN}
                            type="bump"
                            dataKey="userScore"
                            activeDot={{ r: 5 }}
                            stroke={BLUE}
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
                {Boolean(!result.length) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center">
                        <Text>{t("stat.empty-msg")}</Text>
                    </div>
                )}
            </div>
        </Box>
    );
};
