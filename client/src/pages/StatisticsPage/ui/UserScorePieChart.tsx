import { useAppSelector } from "app/store";
import { useCallback, useMemo, useState } from "react";
import {
    Cell,
    Legend,
    LegendProps,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
    Tooltip,
} from "recharts";

import { CustomTooltipProps, SortScoreBy } from "entities/Data/model/types";
import { classNames } from "shared/lib/classNames";
import { getNoun } from "shared/lib/getNoun";
import { AppSwitch } from "shared/ui/AppSwitch/AppSwitch";
import { Box } from "shared/ui/Boxes/Box";
import { Heading } from "shared/ui/Text/Heading";
import { getSortedByScore } from "../model/selectors";
import { useTheme } from "app/theme";
import { Message } from "shared/ui/Text/Message";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const RADIAN = Math.PI / 180;
const COLORS = [
    { pie: "#eff6ff", legend: "bg-blue-50", text: "rgb(17 24 39)" },
    { pie: "#dbeafe", legend: "bg-blue-100", text: "rgb(17 24 39)" },
    { pie: "#bfdbfe", legend: "bg-blue-200", text: "rgb(17 24 39)" },
    { pie: "#93c5fd", legend: "bg-blue-300", text: "rgb(17 24 39)" },
    { pie: "#60a5fa", legend: "bg-blue-400", text: "white" },
    { pie: "#3b82f6", legend: "bg-blue-500", text: "white" },
    { pie: "#2563eb", legend: "bg-blue-600", text: "white" },
    { pie: "#1d4ed8", legend: "bg-blue-700", text: "white" },
    { pie: "#1e40af", legend: "bg-blue-800", text: "white" },
    { pie: "#172554", legend: "bg-blue-900", text: "white" },
];
const ANIMATION_DURATION = 300;
const ANIMATION_BEGIN = 0;

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
            fill={COLORS[payload.label - 1].text}
            className={`font-medium text-sm pointer-events-none`}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomLegend = (props: LegendProps) => {
    const { payload } = props;
    const getLabel = (entry: any) => entry.payload?.label;

    return payload ? (
        <ul className="flex flex-col gap-1 ml-2">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} className="flex gap-2 items-center">
                    <div
                        className={`${COLORS[getLabel(entry) - 1].legend} h-4 w-4 rounded-sm`}
                    ></div>
                    <span className="text-sm font-medium">{getLabel(entry)}</span>
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
                filter: `drop-shadow(0px 0px 5px ${COLORS[payload.label - 1].pie}`,
                fill: COLORS[payload.label - 1].pie,
                outline: "none",
            }}
        />
    );
};

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const value = payload[0].value as string | number;
        const name = payload[0].payload.label;
        const percantage =
            total && typeof Number(value) === "number"
                ? Math.round((Number(value) / total) * 100)
                : 0;

        return (
            <div className="bg-my-neutral-100 border border-my-neutral-200 rounded-xl px-4 py-1 text-center">
                <p className="text-sm">
                    {name} {getNoun(Number(name), "звезда", "звезды", "звезд")}
                </p>
                <p className="text-base font-medium">
                    {value} {getNoun(Number(value), "фильм", "фильма", "фильмов")}{" "}
                    {percantage && <span>({percantage}%)</span>}
                </p>
            </div>
        );
    }

    return null;
};

export const UserScorePieChart = () => {
    const [scoresState, setScoresState] = useState<SortScoreBy>("userScore");
    const scores = useAppSelector((state) => getSortedByScore(state, scoresState));

    const totalScores = useMemo(() => scores.reduce((acc, el) => (acc += el.value), 0), [scores]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const onPieEnter = useCallback((index: number) => setActiveIndex(index), []);
    const onPieLeave = useCallback(() => setActiveIndex(null), []);
    const toggleScoresState = useCallback(
        () => setScoresState((p) => (p === "rating" ? "userScore" : "rating")),
        []
    );
    const { theme } = useTheme();
    const dark = "rgb(23, 23, 23)";
    const light = "rgb(255, 255, 255)";
    const stroke = scores.length === 1 ? "none" : theme === "dark" ? dark : light;

    const titiles: Record<SortScoreBy, { title: string; error: string }> = {
        rating: { title: "Рейтинг фильмов", error: "Нет фильмов с рейтингом." },
        userScore: { title: "Оценки пользователя", error: "Нет фильмов с оценкой пользователя." },
    };

    return (
        <Box>
            <Heading headinglevel={1}>Оценки</Heading>
            <div className="w-full flex items-center justify-center gap-2 sm:gap-4 font-medium text-sm sm:text-base">
                <button
                    onClick={() => setScoresState("userScore")}
                    className={classNames("", {
                        ["opacity-50"]: scoresState !== "userScore",
                    })}
                >
                    {titiles.userScore.title}
                </button>
                <AppSwitch
                    checked={scoresState === "rating"}
                    onChange={toggleScoresState}
                    sameChecked
                />
                <button
                    onClick={() => setScoresState("rating")}
                    className={classNames("", {
                        ["opacity-50"]: scoresState !== "rating",
                    })}
                >
                    {titiles.rating.title}
                </button>
            </div>
            <div className="h-72 flex items-center justify-center">
                {scores.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{}}>
                            <Pie
                                activeIndex={activeIndex ?? undefined}
                                onMouseOver={(_, index) => onPieEnter(index)}
                                onMouseOut={onPieLeave}
                                data={scores}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={<CustomLabel />}
                                outerRadius={135}
                                dataKey="value"
                                animationBegin={ANIMATION_BEGIN}
                                animationDuration={ANIMATION_DURATION}
                                activeShape={<CustomActiveShape />}
                                strokeWidth={1}
                                stroke={stroke}
                            >
                                {scores.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        style={{
                                            fill: COLORS[entry.label - 1].pie,
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
                    </ResponsiveContainer>
                ) : (
                    <Message message={titiles[scoresState].error} />
                )}
            </div>
        </Box>
    );
};
