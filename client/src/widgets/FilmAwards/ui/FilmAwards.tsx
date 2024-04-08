import { AppImage } from "shared/ui/AppImage/AppImage";
import { Spinner } from "shared/ui/Spinner/Spinner";

import formatFilmError from "shared/api/helpers/formatFilmError";
import { StatusBox } from "shared/ui/Boxes/StatusBox";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";
import { useGetFilmAwardsQuery } from "../model/filmAwardsApi";
import { FilmAwardsList } from "./FilmAwardsList";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { UserBoxSeparator } from "shared/ui/Boxes/UserBox";

interface FilmAwardsProps {
    filmId: number;
}

export const FilmAwards = ({ filmId }: FilmAwardsProps) => {
    const { data, isError, isLoading, isFetching, error } = useGetFilmAwardsQuery(filmId);

    const { t } = useTranslation();

    if (isError)
        return (
            <div className="flex items-center flex-col gap-2">
                <StatusBox isError={isError} msgOrChildren={formatFilmError(error)} withoutBox />
            </div>
        );

    if (isLoading || isFetching)
        return (
            <div className="self-center">
                <Spinner />
            </div>
        );

    if (!data?.total)
        return (
            <div className="h-7 flex items-center justify-center">
                <Text>{t("details.awards-empty")}</Text>
            </div>
        );

    return data.items.map((award, index) => (
        <Fragment key={award.name}>
            <ul className="flex gap-2 px-2 py-2 sm:px-4 rounded-xl">
                <div className="flex flex-col gap-2 flex-1 text-sm sm:text-base">
                    <Heading headinglevel={4}>
                        {award.name} ({award.year})
                    </Heading>

                    {!!award.wins.length && (
                        <div>
                            <span className="">
                                {t("details.awards-winner")} ({award.wins.length}):
                            </span>
                            <FilmAwardsList awards={award.wins} winner />
                        </div>
                    )}
                    {!!award.nominates.length && (
                        <div>
                            <span>
                                {t("details.awards-nomination")} ({award.nominates.length}):
                            </span>
                            <FilmAwardsList awards={award.nominates} />
                        </div>
                    )}
                </div>
                {award.imageUrl && (
                    <div className="h-14 w-14 md:h-20 md:w-20 rounded-full overflow-hidden">
                        <AppImage src={award.imageUrl} className="object-contain" />
                    </div>
                )}
            </ul>
            {Boolean(index !== data.items.length - 1) && <UserBoxSeparator />}
        </Fragment>
    ));
};
