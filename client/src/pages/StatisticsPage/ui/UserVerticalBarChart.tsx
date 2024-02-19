import { useAppDispatch, useAppSelector } from "app/store";
import { sortGenresOptions } from "entities/Data/model/data";
import {
    getDisplayAllGenres,
    getSortGenresBy,
    getSortedByGenre,
} from "entities/Data/model/selectors";
import { dataActions } from "entities/Data/model/slice";
import { CustomTooltipProps, TGenresSort } from "entities/Data/model/types";

import { useTheme } from "app/theme";
import { useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Settings } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { getNoun } from "shared/lib/getNoun";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { AppSwitch } from "shared/ui/AppSwitch/AppSwitch";
import { Box } from "shared/ui/Boxes/Box";
import { SettingsBox } from "shared/ui/Boxes/SettingsBox";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";
import { addZerosToNumber } from "../../../shared/lib/addZerosToNumber";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const MAX_GENRES = 10;
const CATEGORY_HEIGHT = 30;
const TICK_HEIGHT = 22;
const LETTER_WIDTH = 8.3;
const ANIMATION_DURATION = 300;
const LIGHT_THEME_MAIN_TEXT = "rgb(245 245 245)";
const DARK_THEME_MAIN_TEXT = "rgb(38 38 38)";

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const value = Number(payload[0].payload.count);
        const name = payload[0].payload.label;
        const percantage =
            total && typeof Number(value) === "number"
                ? Math.round((Number(value) / total) * 100)
                : 0;

        const avgRating = payload[0].payload.avgRating;
        const avgUserScore = payload[0].payload.avgUserScore;

        return (
            <div className="rounded-xl px-4 py-1 font-normal text-center bg-my-neutral-100 border border-my-neutral-200">
                <p className="text-base font-medium">{name}</p>
                <p className="text-sm">
                    {value} {getNoun(Number(value), "фильм", "фильма", "фильмов")} ({percantage}%)
                </p>
                <p className="flex flex-col text-sm font-bold">
                    <span className="text-blue-500">
                        рейтинг &#8776; {addZerosToNumber(avgRating, 2)}
                    </span>
                    <span className="text-my-green-500">
                        оценка &#8776; {addZerosToNumber(avgUserScore, 2)}
                    </span>
                </p>
            </div>
        );
    }

    return null;
};

const CustomLabelList = (props: any) => {
    const { x, y, width, height, value, labelFor } = props;
    const { theme } = useTheme();
    const CHART_TICK_COLOR = theme === "dark" ? LIGHT_THEME_MAIN_TEXT : DARK_THEME_MAIN_TEXT;

    if (labelFor === "avgUserScore")
        return value ? (
            <text
                className="text-sm rounded-xl font-medium"
                textAnchor="middle"
                x={x + width / 2}
                y={y + height / 2 + 4}
                fill={LIGHT_THEME_MAIN_TEXT}
            >
                {addZerosToNumber(value, 2)}
            </text>
        ) : null;

    if (labelFor === "avgRating")
        return typeof value === "number" ? (
            <text
                className="text-xs rounded-xl font-medium"
                textAnchor="middle"
                x={x + width + 16}
                y={y + height / 2 + 4}
                fill={CHART_TICK_COLOR}
            >
                {addZerosToNumber(value, 2)}
            </text>
        ) : null;

    return null;
};

export const UserVarticalBarChart = () => {
    const genresSortBy = useAppSelector(getSortGenresBy);
    const displayAll = useAppSelector(getDisplayAllGenres);
    const genres = useAppSelector((state) => getSortedByGenre(state, genresSortBy));
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen((p) => !p);
    const { theme } = useTheme();
    const CHART_TICK_COLOR = theme === "dark" ? LIGHT_THEME_MAIN_TEXT : DARK_THEME_MAIN_TEXT;
    const CHART_HOVER_COLOR = theme === "dark" ? DARK_THEME_MAIN_TEXT : LIGHT_THEME_MAIN_TEXT;

    const dispatch = useAppDispatch();
    const totalGenres = useMemo(() => genres.reduce((acc, el) => (acc += el.count), 0), [genres]);
    const longestWord = useMemo(
        () =>
            genres.reduce(
                (acc, el) =>
                    (acc =
                        acc > `${el.label} (${el.count})`.length
                            ? acc
                            : `${el.label} (${el.count})`.length),
                0
            ),
        [genres]
    );

    const displayedGenres = displayAll ? genres : genres.slice(0, MAX_GENRES);
    const height = `${displayedGenres.length * CATEGORY_HEIGHT + TICK_HEIGHT}px`;
    const width = longestWord * LETTER_WIDTH;

    const handleGenreSortChange = (newGenre: string) =>
        dispatch(dataActions.setSortGenre(newGenre as TGenresSort));

    const handleDisplayAllGenresToggle = () =>
        dispatch(dataActions.setDisplayAllGenres(!displayAll));

    if (!displayedGenres.length) return null;

    return (
        <Box>
            <div className="flex items-center gap-2 justify-between">
                <Heading headinglevel={1}>Жанры</Heading>
                <Button theme="regularIcon" onClick={handleToggle}>
                    <Settings />
                </Button>
            </div>

            <SettingsBox condition={isOpen}>
                <div className="flex items-center gap-4">
                    <Text as="span" className="font-medium">
                        Сортировать по:
                    </Text>
                    <AppSelect
                        options={sortGenresOptions}
                        actionChange={handleGenreSortChange}
                        value={genresSortBy}
                        className="text-sm"
                    />
                </div>
                <div className="flex items-center justify-center gap-4 relative">
                    <AppSwitch
                        checked={displayAll}
                        onChange={handleDisplayAllGenresToggle}
                        label={"Показать все"}
                        className={classNames("", {
                            ["opacity-50 pointer-events-none"]: genres.length < MAX_GENRES,
                        })}
                    />
                </div>
            </SettingsBox>

            <div style={{ height }}>
                <ResponsiveContainer width="100%" height="100%" className="text-base font-medium">
                    <BarChart
                        data={displayedGenres}
                        layout="vertical"
                        barSize={20}
                        margin={{ right: 30 }}
                    >
                        <CartesianGrid strokeDasharray="5 5" opacity={0.5} />
                        <XAxis
                            domain={[0, 10]}
                            tickCount={20}
                            allowDecimals={false}
                            type="number"
                            tick={{ fill: CHART_TICK_COLOR }}
                            className="text-sm"
                        />
                        <YAxis
                            width={width}
                            type="category"
                            dataKey="label"
                            tick={{ fill: CHART_TICK_COLOR }}
                            className="text-sm"
                            interval={0}
                            tickLine={false}
                            tickFormatter={(value, index) => `${value} (${genres[index].count})`}
                        />
                        <Tooltip
                            content={<CustomTooltip total={totalGenres} />}
                            cursor={{ fill: CHART_HOVER_COLOR }}
                        />

                        <Bar
                            animationDuration={ANIMATION_DURATION}
                            dataKey={"avgUserScore"}
                            className="fill-blue-500"
                            activeBar={{ stroke: CHART_TICK_COLOR, strokeWidth: 2 }}
                        >
                            <LabelList
                                dataKey="avgRating"
                                content={<CustomLabelList labelFor="avgRating" />}
                            />
                            <LabelList
                                dataKey="avgUserScore"
                                content={<CustomLabelList labelFor="avgUserScore" />}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
};
