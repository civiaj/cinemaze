import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useGetStatsQuery } from "@/entities/Film";
import { Ascending, Descending, EyeClose, EyeOpen, Settings } from "@/shared/assets/icons";
import { addZerosToNumber } from "@/shared/lib/addZerosToNumber";
import { useTheme } from "@/shared/theme";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Box } from "@/shared/ui/Boxes/Box";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { SettingsBox } from "@/shared/ui/Boxes/SettingsBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import {
    ANIMATION_BEGIN,
    ANIMATION_DURATION,
    CATEGORY_HEIGHT,
    COLORS,
    DARK,
    LETTER_WIDTH,
    LIGHT,
    MAX_DISPLAYED,
    TICK_HEIGHT,
} from "../model/config";
import { vbFilters, vbSortOptions } from "../model/data";
import { getSelectByFilter, getVB } from "../model/selectors";
import { statisticsActions } from "../model/slice";
import { VBFilters, VBOrder, VBSortBy, VBStat } from "../model/types";

/* eslint-disable @typescript-eslint/no-explicit-any*/

const CustomTooltip = ({
    active,
    payload,
    total,
}: TooltipProps<VBStat["avgUserScore"], VBStat["count"]> & { total: number }) => {
    const { t } = useTranslation();
    if (active && payload && payload.length) {
        const item = payload[0].payload as VBStat;
        const percantage =
            total && typeof Number(item.count) === "number"
                ? Math.round((Number(item.count) / total) * 100)
                : 0;

        return (
            <div className="bg-my-neutral-50 bg-opacity-10 px-4 py-2 sm:px-6 sm:py-4 flex items-end flex-col">
                <p className="text-base sm:text-2xl font-medium">{item.name}</p>
                <span className="sm:text-base text-xs font-normal mb-1 sm:mb-2">
                    {item.count} {t("plural.film", { count: item.count })} {percantage}%
                </span>
                <div className="grid grid-cols-[repeat(2,max-content)] justify-items-end font-normal gap-x-4 text-xs sm:text-sm">
                    <p>{t("stat.cat-rating")}</p>
                    <p>{addZerosToNumber(item.avgRating, 1)}</p>
                    <p>{t("stat.cat-userscore")}</p>
                    <p>{addZerosToNumber(item.avgUserScore, 1)}</p>
                </div>
            </div>
        );
    }

    return null;
};

const CustomLabelList = (props: any) => {
    const { x, y, width, height, value, labelFor } = props;
    const { theme } = useTheme();
    const color = COLORS[theme];

    if (labelFor === "avgUserScore")
        return value ? (
            <text
                className="text-sm rounded-xl font-medium"
                textAnchor="middle"
                x={x + width / 2}
                y={y + height / 2 + 4}
                fill={COLORS.dark}
            >
                {addZerosToNumber(value, 1)}
            </text>
        ) : null;

    if (labelFor === "avgRating")
        return typeof value === "number" ? (
            <text
                className="text-sm rounded-xl font-medium"
                textAnchor="middle"
                x={x + width + 16}
                y={y + height / 2 + 4}
                fill={color}
            >
                {addZerosToNumber(value, 1)}
            </text>
        ) : null;

    return null;
};

export const FavoriteVerticalBarChart = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { filter, order, showAll, sort } = useAppSelector(getVB);
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    const selectByFilter = useMemo(() => getSelectByFilter, []);
    const { data } = useGetStatsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return { data: selectByFilter(data, filter, sort, order) };
        },
    });

    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen((p) => !p);

    const total = useMemo(() => data.reduce((acc, el) => (acc += el.count), 0), [data]);
    const longestWord = useMemo(
        () =>
            data.reduce(
                (acc, el) =>
                    (acc =
                        acc > `${el.name} (${el.count})`.length
                            ? acc
                            : `${el.name} (${el.count})`.length),
                0
            ),
        [data]
    );

    const displayed = showAll ? data : data.slice(0, MAX_DISPLAYED);

    const height = `${displayed.length * CATEGORY_HEIGHT + TICK_HEIGHT}px`;

    const width = longestWord * LETTER_WIDTH;
    const { theme } = useTheme();
    const color = COLORS[theme];

    const onSortChange = (newSort: string) => {
        dispatch(statisticsActions.vbSetSort(newSort as VBSortBy));
    };

    const onFilterChange = (newValue: string) => [
        dispatch(statisticsActions.vbSetFilter(newValue as VBFilters)),
    ];

    const onShowAllChange = () => {
        dispatch(statisticsActions.vbSetShowAll(!showAll));
    };

    const onOrderChange = (newOrder: VBOrder) => {
        dispatch(statisticsActions.vbSetOrder(newOrder));
    };

    return (
        <Box>
            <OutsideClickWrapper
                onClose={() => setIsOpen(false)}
                className="flex flex-col gap-2 sm:gap-4"
                preventClose={isModal}
            >
                <div className="flex items-center gap-2 justify-between">
                    <Heading headinglevel={1}>{t("stat.cag")}</Heading>
                    <Button theme="regularIcon" onClick={handleToggle}>
                        <Settings />
                    </Button>
                </div>

                <SettingsBox condition={isOpen}>
                    <Text as="span" className="font-medium">
                        {t("stat.cag-data")}
                    </Text>
                    <div className="flex gap-2">
                        <AppSelect
                            options={vbFilters}
                            actionChange={onFilterChange}
                            value={filter}
                            className="bg-my-white w-32 sm:w-48 "
                        />
                        <Button
                            theme="regularIcon"
                            className="bg-my-white"
                            onClick={() =>
                                displayed.length < MAX_DISPLAYED
                                    ? setModal(true)
                                    : onShowAllChange()
                            }
                            title={t("stat.cat-show-all")}
                        >
                            {showAll ? <EyeOpen /> : <EyeClose />}
                        </Button>
                    </div>
                    <Text as="span" className="font-medium">
                        {t("stat.cag-sort")}:
                    </Text>
                    <div className="flex gap-2">
                        <AppSelect
                            options={vbSortOptions}
                            actionChange={onSortChange}
                            value={sort}
                            className="bg-my-white w-32 sm:w-48"
                        />
                        <Button
                            theme="regularIcon"
                            className="bg-my-white"
                            title={t("stat.cat-change-order")}
                            onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
                        >
                            {order === "asc" ? <Ascending /> : <Descending />}
                        </Button>
                        {isModal && (
                            <Modal onClose={onClose}>
                                <Modal.Header
                                    header={t("modal.notification-t")}
                                    onClose={onClose}
                                />
                                <Modal.Body>
                                    <div>
                                        <Text as="p">{t("stat.notification-one")}</Text>
                                        <Text as="p">{t("stat.notification-two")}</Text>
                                    </div>
                                </Modal.Body>
                                <Modal.Controls theme="none">
                                    <Button onClick={onClose} theme="regular">
                                        {t("btn.back")}
                                    </Button>
                                </Modal.Controls>
                            </Modal>
                        )}
                    </div>
                </SettingsBox>
            </OutsideClickWrapper>
            <div style={{ height }}>
                <ResponsiveContainer width="100%" height="100%" className="text-base font-medium">
                    <BarChart
                        data={displayed}
                        layout="vertical"
                        barSize={20}
                        margin={{ right: 10 }}
                    >
                        <CartesianGrid opacity={0.2} />
                        <XAxis
                            domain={[0, 10]}
                            interval={0}
                            tickCount={20}
                            allowDecimals={false}
                            type="number"
                            tick={{ fill: color, textAnchor: "middle" }}
                            className="text-xs"
                            textAnchor="end"
                        />
                        <YAxis
                            width={width}
                            type="category"
                            dataKey="name"
                            tick={{ fill: color }}
                            className="text-sm"
                            interval={0}
                            tickLine={false}
                            tickFormatter={(value, index) => `${value} (${data[index].count})`}
                        />
                        <Tooltip
                            content={<CustomTooltip total={total} />}
                            cursor={{ fill: color === DARK ? LIGHT : DARK }}
                        />

                        <Bar
                            animationDuration={ANIMATION_DURATION}
                            animationBegin={ANIMATION_BEGIN}
                            dataKey={sort}
                            className="fill-blue-500"
                            activeBar={{ stroke: color, strokeWidth: 2 }}
                        >
                            <LabelList
                                dataKey={sort}
                                content={<CustomLabelList labelFor="avgUserScore" />}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
};
