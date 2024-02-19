import { memo } from "react";
import { EMPTY_LINE } from "shared/const/const";
import { classNames } from "shared/lib/classNames";
import { Heading } from "shared/ui/Text/Heading";
import { numberWithSpaces } from "shared/lib/numberWithSpaces";
import { getNoun } from "shared/lib/getNoun";
import { ColoredNumber } from "shared/ui/ColoredNumber/ColoredNumber";
import { useDetailsQuery } from "pages/DetailsPage";

interface AboutProps {
    filmId: number;
}

export const AboutDetails = memo((props: AboutProps) => {
    const { filmId } = props;
    const { currentData } = useDetailsQuery(filmId);

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
        { title: "Год производства", data: year },
        { title: "Страна", data: countries?.map((country) => country.country).join(", ") },
        { title: "Жанр", data: genres?.map((genre) => genre.genre).join(", ") },
        { title: "Слоган", data: slogan },
        { title: "Возраст", data: ratingAgeLimits },
        { title: "Рейтинг MPAA", data: ratingMpaa },
        {
            title: "Время",
            data: filmLength ? `${filmLengthMins} мин. / ${filmLengthHours}` : EMPTY_LINE,
        },
        {
            title: "Рейтинг Кинопоиск",
            data: rating ? (
                <ColoredNumber className="font-bold" number={Number(rating)} addZeros />
            ) : null,
            special: true,
        },
        {
            title: "Оценок",
            data: ratingKinopoiskVoteCount
                ? `${numberWithSpaces(ratingKinopoiskVoteCount)} ${getNoun(
                      ratingKinopoiskVoteCount,
                      "оценка",
                      "оценок",
                      "оценок"
                  )}`
                : ratingKinopoiskVoteCount,
            special: true,
        },
        {
            title: "Рецензий",
            data: reviewsCount
                ? `${numberWithSpaces(reviewsCount)} ${getNoun(
                      reviewsCount,
                      "рецензия",
                      "рецензии",
                      "рецензий"
                  )}`
                : reviewsCount,
            special: true,
        },
    ];

    return (
        <div className="flex flex-col gap-2 mt-4 vsm:mt-0">
            <Heading headinglevel={3}>О фильме</Heading>
            <ul className="flex flex-col gap-2">
                {details.map((detail) => (
                    <li
                        key={detail.title}
                        className={classNames("grid grid-cols-2 gap-x-2 text-sm", {
                            ["grid mdb:hidden"]: !!detail.special,
                        })}
                    >
                        <span className="text-my-neutral-500 break-words">{detail.title}</span>
                        <span
                            className={classNames("break-words place-self-start", {
                                ["uppercase border px-1 border-my-neutral-800 font-bold"]:
                                    (detail.title == "Рейтинг MPAA" || detail.title == "Возраст") &&
                                    detail.data !== EMPTY_LINE,
                            })}
                        >
                            {detail.data ?? EMPTY_LINE}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
});
