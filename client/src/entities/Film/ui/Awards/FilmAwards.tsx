import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { useAwardsQuery } from "../../model/filmApi";
import { FilmAwardsList } from "./FilmAwardsList";

interface FilmAwardsProps {
    id: number;
}

export const FilmAwards = ({ id }: FilmAwardsProps) => {
    const { data, isError, isLoading, isFetching, error } = useAwardsQuery(id);

    const { t } = useTranslation();

    if (isError)
        return (
            <div className="flex items-center flex-col gap-2">
                <StatusBox isError={isError} msgOrChildren={formatServerError(error)} withoutBox />
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

    return data.items.map(({ name, imageUrl, nominates, wins, year }, index) => (
        <Fragment key={name}>
            <ul className="flex gap-2 px-2 py-2 sm:px-4 rounded-xl">
                <div className="flex flex-col gap-2 flex-1 text-sm sm:text-base">
                    <Heading headinglevel={4}>
                        {name} ({year})
                    </Heading>

                    {!!wins.length && (
                        <div>
                            <span className="">
                                {t("details.awards-winner")} ({wins.length}):
                            </span>
                            <FilmAwardsList awards={wins} winner />
                        </div>
                    )}
                    {!!nominates.length && (
                        <div>
                            <span>
                                {t("details.awards-nomination")} ({nominates.length}):
                            </span>
                            <FilmAwardsList awards={nominates} />
                        </div>
                    )}
                </div>
                {imageUrl && (
                    <div className="h-14 w-14 md:h-20 md:w-20 rounded-full overflow-hidden">
                        <AppImage src={imageUrl} className="object-contain" />
                    </div>
                )}
            </ul>
            {Boolean(index !== data.items.length - 1) && <UserBoxSeparator />}
        </Fragment>
    ));
};
