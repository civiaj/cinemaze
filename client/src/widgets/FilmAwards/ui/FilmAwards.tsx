import { AppImage } from "shared/ui/AppImage/AppImage";
import { Spinner } from "shared/ui/Spinner/Spinner";

import { useGetFilmAwardsQuery } from "../model/filmAwardsApi";
import { FilmAwardsList } from "./FilmAwardsList";
import { Message } from "shared/ui/Text/Message";
import { Heading } from "shared/ui/Text/Heading";

interface FilmAwardsProps {
    filmId: number;
}

export const FilmAwards = ({ filmId }: FilmAwardsProps) => {
    const { data, isError, isLoading, isFetching } = useGetFilmAwardsQuery(filmId);

    if (isError) return <Message message="Что-то пошло не так." />;

    if (isLoading || isFetching)
        return (
            <div className="py-3 self-center">
                <Spinner />
            </div>
        );

    if (!data?.total) return <Message message="Нет наград." />;

    return data.items.map((award) => (
        <ul key={award.name} className="flex gap-2 px-2 py-2 sm:px-4 rounded-xl">
            <div className="flex flex-col gap-2 flex-1 text-sm sm:text-base">
                <Heading headinglevel={4}>
                    {award.name} ({award.year})
                </Heading>

                {!!award.wins.length && (
                    <div>
                        <span className="">Победитель ({award.wins.length}):</span>
                        <FilmAwardsList awards={award.wins} winner />
                    </div>
                )}
                {!!award.nominates.length && (
                    <div>
                        <span>Номинации ({award.nominates.length}):</span>
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
    ));
};
