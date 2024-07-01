import { UpdateFavorite, useDetailsQuery } from "@/entities/Film";
import { Box } from "@/shared/ui/Boxes/Box";
import { AboutDetails } from "./AboutDetails";
import { AboutPoster } from "./AboutPoster";
import { AboutRating } from "./AboutRating";
import { FilmDetailsHeader } from "./FilmDetailsHeader";

type Props = {
    id: number;
    label: string;
    updateFavorite: UpdateFavorite;
    disabled: boolean;
};

export const FilmDetailsActions = (props: Props) => {
    const { id, label, updateFavorite, disabled } = props;
    const { currentData } = useDetailsQuery(id);
    const {
        posterUrl,
        webUrl,
        ratingAgeLimits,
        year,
        nameOriginal,
        rating,
        ratingKinopoiskVoteCount,
        reviewsCount,
        favorite,
    } = currentData! ?? {};

    return (
        <Box>
            <div className="flex flex-col gap-x-4 sm:gap-x-6 vsm:grid vsm:grid-cols-8 relative">
                <AboutPoster
                    className="col-span-3 mdb:col-span-2"
                    posterUrl={posterUrl}
                    webUrl={webUrl}
                    key={id}
                />
                <div className="flex-1 grid grid-cols-7 col-span-5 mdb:col-span-6 gap-x-6">
                    <div className="flex flex-col col-span-7 mdb:col-span-5 gap-4">
                        <FilmDetailsHeader
                            details={{ label, ratingAgeLimits, year, nameOriginal, favorite }}
                            updateFavorite={updateFavorite}
                            disabled={disabled}
                        />
                        <AboutDetails id={id} />
                    </div>
                    <AboutRating
                        className="col-span-2 hidden mdb:flex"
                        ratingKinopoiskVoteCount={ratingKinopoiskVoteCount}
                        reviewsCount={reviewsCount}
                        rating={rating}
                        updateFavorite={updateFavorite}
                        disabled={disabled}
                        favorite={favorite}
                    />
                </div>
            </div>
        </Box>
    );
};
