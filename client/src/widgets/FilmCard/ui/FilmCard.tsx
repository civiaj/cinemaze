import { routePath } from "app/router/router";
import { memo, useCallback } from "react";
import { Close } from "shared/assets/icons";
import { EMPTY_LINE } from "shared/const/const";
import { classNames } from "shared/lib/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { AppImage } from "shared/ui/AppImage/AppImage";
import { Heading } from "shared/ui/Text/Heading";

import { FilmCardPropsT } from "../model/types";
import { useTranslation } from "react-i18next";

export const FilmCard = memo((props: FilmCardPropsT) => {
    const {
        film,
        userScore,
        isHidden,
        label = "Watch",
        cardStyles,
        onDelete,
        onClick,
        appearance,
        hideStats,
    } = props;

    const {
        filmId,
        nameRu,
        posterUrlPreview,
        rating,
        nameEn,
        nameOriginal,
        genres,
        year,
        countries,
        filmLength,
    } = film;

    const { t } = useTranslation();
    const filmTitle = nameRu ?? nameEn ?? nameOriginal ?? EMPTY_LINE;
    const handleClick = useCallback(() => onClick?.(), [onClick]);
    const stats = hideStats
        ? []
        : [
              { value: userScore, styles: "bg-green-500", key: "userScore" },
              {
                  value: !rating || rating === "null" ? EMPTY_LINE : rating,
                  styles: "bg-blue-500",
                  key: "rating",
              },
          ];

    if (isHidden || !appearance) return null;

    if (appearance === "tile")
        return (
            <li
                className={classNames("relative group w-full h-72 overflow-hidden", {}, [
                    cardStyles?.card,
                ])}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% to-neutral-950/90 to-90% z-[1]" />
                <AppLink
                    to={`${routePath.details}/${String(filmId)}`}
                    theme="card"
                    className="absolute inset-0 z-[5]"
                    onClick={handleClick}
                />
                <AppImage src={posterUrlPreview} alt={`${filmTitle} poster`} />

                <div className="absolute inset-0 group-hover:bg-neutral-900/50 group-focus:bg-neutral-900/50 z-[2]" />
                <div className="absolute left-2 bottom-2 z-[1]">
                    <Heading
                        headinglevel={4}
                        className={classNames(
                            "text-neutral-50 w-full line-clamp-1 pr-2 break-words text-start",
                            {},
                            [cardStyles?.title]
                        )}
                    >
                        {filmTitle}
                    </Heading>
                </div>
                <span
                    className={classNames(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 z-[2] font-medium",
                        {},
                        [cardStyles?.label]
                    )}
                >
                    {t(label)}
                </span>

                <div className="absolute top-2 left-2 flex items-center gap-2">
                    {stats.map(
                        (item) =>
                            item.value && (
                                <span
                                    key={item.key}
                                    className={classNames(
                                        "py-1 px-2 text-xs font-medium rounded-md text-neutral-50",
                                        {},
                                        [item.styles]
                                    )}
                                >
                                    {item.value}
                                </span>
                            )
                    )}
                </div>
                {onDelete && (
                    <button
                        onClick={() => onDelete(filmId)}
                        className="bg-my-red-200 absolute right-2 top-2 h-6 w-6 rounded-full flex items-center justify-center z-[6] text-neutral-50 hover:bg-my-red-300 opacity-0 group-hover:opacity-100"
                    >
                        <Close className="text-lg stroke-2" />
                    </button>
                )}
            </li>
        );

    if (appearance === "list")
        return (
            <li>
                <Box className="gap-4 relative">
                    <div className="flex gap-4">
                        <div className="relative w-36 h-52 rounded-xl overflow-hidden shrink-0 border border-my-neutral-200">
                            <AppImage src={posterUrlPreview} alt={`${filmTitle} poster`} />
                            <div className="absolute top-2 left-2 flex items-center gap-2">
                                {stats.map(
                                    (item) =>
                                        item.value && (
                                            <span
                                                key={item.key}
                                                className={classNames(
                                                    "py-1 px-2 text-xs font-medium rounded-md text-neutral-50",
                                                    {},
                                                    [item.styles]
                                                )}
                                            >
                                                {item.value}
                                            </span>
                                        )
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <div className="flex justify-between items-center">
                                <div className="break-words line-clamp-1">
                                    <Heading headinglevel={3} className="inline">
                                        {filmTitle}
                                    </Heading>
                                    {year && <span> ({year})</span>}
                                </div>
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(filmId)}
                                        className="bg-my-red-200 h-6 w-6 rounded-full flex items-center justify-center text-neutral-50 hover:bg-my-red-300 shrink-0"
                                    >
                                        <Close className="text-lg" />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-1 font-normal text-sm">
                                {filmLength && (
                                    <p>
                                        {t("Film length")}: {filmLength}
                                    </p>
                                )}
                                {!!countries?.length && (
                                    <p>
                                        {t("Countries")}:{" "}
                                        {countries.map((country) => country.country).join(", ")}
                                    </p>
                                )}
                            </div>
                            <div
                                className={classNames("flex items-center gap-2 justify-between", {
                                    ["justify-end"]: !genres?.length,
                                })}
                            >
                                {!!genres?.length && (
                                    <ul className="gap-1 flex self-end flex-wrap">
                                        {genres.map(({ genre }) => (
                                            <li
                                                className="px-2 py-1 rounded-full flex items-center justify-center bg-my-neutral-900 text-my-neutral-50 font-medium text-xs md:text-sm md:px-4"
                                                key={`${filmId}-${genre}`}
                                            >
                                                <span>{genre}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <AppLink
                                    theme="button"
                                    className="hidden sm:flex self-end"
                                    to={`${routePath.details}/${String(filmId)}`}
                                    onClick={handleClick}
                                >
                                    {t("Watch")}
                                </AppLink>
                            </div>
                        </div>
                    </div>
                    <AppLink
                        theme="button"
                        className="flex sm:hidden text-center"
                        to={`${routePath.details}/${String(filmId)}`}
                        onClick={handleClick}
                    >
                        {t("Watch")}
                    </AppLink>
                </Box>
            </li>
        );
});
