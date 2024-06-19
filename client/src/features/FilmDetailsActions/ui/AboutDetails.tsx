import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDetailsQuery } from "@/entities/FilmDetails";
import { EMPTY_LINE } from "@/shared/const/const";
import { classNames } from "@/shared/lib/classNames";
import { numberWithSpaces } from "@/shared/lib/numberWithSpaces";
import { ColoredNumber } from "@/shared/ui/ColoredNumber/ColoredNumber";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

interface AboutProps {
    filmId: number;
}

export const AboutDetails = memo((props: AboutProps) => {
    const { filmId } = props;
    const { currentData } = useDetailsQuery(filmId);
    const { t } = useTranslation();

    const {
        countries,
        filmLength,
        filmLengthMins,
        filmLengthHours,
        genres,
        ratingMpaa,
        slogan,
        year,
        ratingAgeLimits,
        rating,
        ratingKinopoiskVoteCount,
        reviewsCount,
    } = currentData ?? {};

    const details = [
        { title: "details.year", data: year },
        { title: "details.country", data: countries?.map((country) => country.country).join(", ") },
        { title: "details.genre", data: genres?.map((genre) => genre.genre).join(", ") },
        { title: "details.slogan", data: slogan },
        { title: "details.age-limit", data: ratingAgeLimits },
        { title: "details.mpaa", data: ratingMpaa },
        {
            title: "details.length",
            data: filmLength
                ? `${filmLengthMins} ${t("details.min")} / ${filmLengthHours}`
                : EMPTY_LINE,
        },
        {
            title: "details.rate-kp",
            data: rating ? (
                <ColoredNumber className="font-bold" number={Number(rating)} addZeros />
            ) : null,
            special: true,
        },
        {
            title: "details.count-kp",
            data: ratingKinopoiskVoteCount
                ? `${numberWithSpaces(ratingKinopoiskVoteCount)} ${t("plural.vote", {
                      count: ratingKinopoiskVoteCount,
                  })}`
                : ratingKinopoiskVoteCount,
            special: true,
        },
        {
            title: "details.reviews-count",
            data: reviewsCount
                ? `${numberWithSpaces(reviewsCount)} ${t("plural.review", { count: reviewsCount })}`
                : reviewsCount,
            special: true,
        },
    ];

    return (
        <div className="flex flex-col gap-4 mt-4 vsm:mt-0">
            <Heading headinglevel={3}>{t("details.about-movie")}</Heading>
            <ul className="flex flex-col gap-2">
                {details.map((detail) => (
                    <li
                        key={detail.title}
                        className={classNames("grid grid-cols-2 gap-x-2 text-sm", {
                            ["grid mdb:hidden"]: !!detail.special,
                        })}
                    >
                        <Text className="text-my-neutral-500 break-words">{t(detail.title)}</Text>
                        <Text
                            className={classNames("break-words place-self-start", {
                                ["uppercase border px-1 border-my-neutral-800 font-bold"]:
                                    (detail.title == "details.mpaa" ||
                                        detail.title == "details.age-limit") &&
                                    detail.data !== EMPTY_LINE,
                            })}
                        >
                            {detail.data ?? EMPTY_LINE}
                        </Text>
                    </li>
                ))}
            </ul>
        </div>
    );
});
