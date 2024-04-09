import { useGetStatisticsQuery } from "entities/Favorite";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Cell,
    Legend,
    LegendProps,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
    Tooltip,
    TooltipProps,
} from "recharts";
import { classNames } from "shared/lib/classNames";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

import { ANIMATION_BEGIN, ANIMATION_DURATION, MARGIN, PIE_COLORS, RADIAN } from "../model/config";
import { scoreTitles } from "../model/data";
import { getSelectByScore } from "../model/selectors";
import { ScoreFilters, TScore } from "../model/types";
import { Text } from "shared/ui/Text/Text";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const CustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            fill={PIE_COLORS[payload.payload.score - 1].text}
            className={`font-medium text-sm pointer-events-none`}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomLegend = (props: LegendProps) => {
    const { payload } = props;

    return payload ? (
        <ul className="flex flex-col gap-1 ml-2">
            {payload.map((entry: any, index) => (
                <li key={`item-${index}`} className="flex gap-2 items-center">
                    <div
                        className={`${
                            PIE_COLORS[entry.payload.score - 1]?.legend
                        } h-4 w-4 rounded-sm`}
                    ></div>
                    <span className="text-sm font-medium">{entry.payload.score}</span>
                </li>
            ))}
        </ul>
    ) : null;
};

const CustomActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } = props;

    return (
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            tabIndex={-1}
            style={{
                filter: `drop-shadow(0px 0px 5px ${PIE_COLORS[payload.score - 1].pie}`,
                fill: PIE_COLORS[payload.score - 1].pie,
                outline: "none",
            }}
        />
    );
};

const CustomTooltip = ({
    active,
    payload,
    total,
}: TooltipProps<TScore["score"], TScore["count"]> & { total: number }) => {
    const { t } = useTranslation();
    if (active && payload && payload.length) {
        const item = payload[0].payload.payload as TScore;
        const percantage =
            total && typeof Number(item.count) === "number"
                ? Math.round((Number(item.count) / total) * 100)
                : 0;

        return (
            <div className="bg-my-neutral-50 bg-opacity-10 px-6 py-4 flex items-end flex-col">
                <p className="text-2xl font-medium">{item.score}</p>
                <p>
                    {item.count} {t("plural.film", { count: item.count })}{" "}
                    {percantage && <span>({percantage}%)</span>}
                </p>
            </div>
        );
    }

    return null;
};

export const FavoritePieChart = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<ScoreFilters>("userScore");
    const selectByScore = useMemo(() => getSelectByScore, []);
    const { scores } = useGetStatisticsQuery(undefined, {
        selectFromResult: (response) => {
            return { scores: selectByScore(response, filter) };
        },
    });

    const totalScores = useMemo(() => scores.reduce((acc, el) => (acc += el.count), 0), [scores]);

    return (
        <Box>
            <Heading headinglevel={1}>{t("stat.ratings")}</Heading>
            <div className="flex gap-2">
                <Button
                    theme="regularTag"
                    onClick={() => setFilter("userScore")}
                    className={classNames("", {
                        ["bg-blue-500 hover:bg-blue-500 focus:bg-blue-500 text-my-neutral-50"]:
                            filter === "userScore",
                    })}
                >
                    {t(scoreTitles.userScore.title)}
                </Button>

                <Button
                    theme="regularTag"
                    onClick={() => setFilter("rating")}
                    className={classNames("", {
                        ["bg-blue-500 hover:bg-blue-500 focus:bg-blue-500 text-my-neutral-50"]:
                            filter === "rating",
                    })}
                >
                    {t(scoreTitles.rating.title)}
                </Button>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    {scores.length ? (
                        <PieChart margin={MARGIN}>
                            <Pie
                                data={scores}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={<CustomLabel />}
                                outerRadius={135}
                                dataKey="score"
                                animationBegin={ANIMATION_BEGIN}
                                animationDuration={ANIMATION_DURATION}
                                activeShape={<CustomActiveShape />}
                                stroke="none"
                            >
                                {scores.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        style={{
                                            fill: PIE_COLORS[entry.score - 1].pie,
                                        }}
                                        fill="black"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip total={totalScores} />} />
                            <Legend
                                layout="vertical"
                                align="left"
                                verticalAlign="middle"
                                content={<CustomLegend />}
                            />
                        </PieChart>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <Text>{t("stat.pie-empty-msg")}</Text>
                        </div>
                    )}
                </ResponsiveContainer>
            </div>
        </Box>
    );
};
