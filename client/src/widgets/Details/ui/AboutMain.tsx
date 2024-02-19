import { useDetailsQuery } from "pages/DetailsPage";
import { Box } from "shared/ui/Boxes/Box";

import { AboutDetails } from "./AboutDetails";
import { AboutRating } from "./AboutRating";
import { AboutHeader } from "./AboutHeader";
import { AboutPoster } from "./AboutPoster";
import { TFavorite } from "entities/Favorite";

type Props = {
    filmId: number;
    label: string;
    updateFavorite: (favorite: Partial<TFavorite>) => Promise<void>;
    disabled: boolean;
};

export const AboutMain = (props: Props) => {
    const { filmId, label, updateFavorite, disabled } = props;
    const { currentData } = useDetailsQuery(filmId);
    const {
        posterUrl,
        link,
        ratingAgeLimits,
        year,
        nameOriginal,
        rating,
        ratingKinopoiskVoteCount,
        reviewsCount,
    } = currentData ?? {};

    return (
        <Box>
            <div className="flex flex-col gap-x-4 sm:gap-x-6 vsm:grid vsm:grid-cols-8 relative">
                <AboutPoster
                    className="col-span-3 mdb:col-span-2"
                    posterUrl={posterUrl}
                    link={link}
                    key={filmId}
                />
                <div className="flex-1 grid grid-cols-7 col-span-5 mdb:col-span-6 gap-x-6">
                    <div className="flex flex-col col-span-7 mdb:col-span-5 gap-4">
                        <AboutHeader
                            data={{ label, ratingAgeLimits, year, nameOriginal, filmId }}
                            updateFavorite={updateFavorite}
                            disabled={disabled}
                        />
                        <AboutDetails filmId={filmId} />
                    </div>
                    <AboutRating
                        className="col-span-2 hidden mdb:flex"
                        filmId={filmId}
                        ratingKinopoiskVoteCount={ratingKinopoiskVoteCount}
                        reviewsCount={reviewsCount}
                        rating={rating}
                        updateFavorite={updateFavorite}
                        disabled={disabled}
                    />
                </div>
            </div>
        </Box>
    );
};
