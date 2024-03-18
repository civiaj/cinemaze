import { useParams } from "react-router-dom";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "app/store";
import { Breadcrumbs } from "entities/Ui";
import { TFavorite, useAddFavoriteMutation, useGetOneFavoriteQuery } from "entities/Favorite";
import { selectUser } from "entities/User";
import { Reviews } from "widgets/Reviews";
import { Similars } from "widgets/Similars";
import { AboutMain, Rating } from "widgets/Details";
import { EMPTY_LINE } from "shared/const/const";
import remapDetailsToFilm from "shared/lib/remapDetailsToFilm";
import { StatusBox } from "shared/ui/Boxes/StatusBox";

import { useDetailsQuery } from "../model/detailsApi";
import { ViewSwitcher } from "../ui/ViewSwitcher";
import { DetailsPageSkeleton } from "./DetailsPageSkeleton";
import formatFilmError from "shared/api/helpers/formatFilmError";

export const DetailsPageBody = () => {
    const { id } = useParams();
    const filmId = Number(id);
    const user = useAppSelector(selectUser);

    const details = useDetailsQuery(filmId);
    const favorite = useGetOneFavoriteQuery(filmId, {
        skip: !user,
    });

    const [addFavorite, { isLoading }] = useAddFavoriteMutation();

    const updateFavorite = useCallback(
        async (favorite: Partial<TFavorite>) => {
            if (!user || !details.data) {
                toast.error("Необходимо авторизоваться");
                return;
            }
            addFavorite({ film: remapDetailsToFilm(details.data), favorite });
        },
        [addFavorite, details, user]
    );

    const loading = details.isLoading || details.isFetching || favorite.isLoading;

    if (loading) return <DetailsPageSkeleton />;

    if (details.isError || !details.data)
        return <StatusBox isError={details.isError} errorMsg={formatFilmError(details.error)} />;

    const { nameRu, nameEn, nameOriginal, ratingImdb, rating } = details.data;
    const label = nameRu ?? nameEn ?? nameOriginal ?? EMPTY_LINE;
    const disabled = isLoading || favorite.isFetching || favorite.isLoading;

    return (
        <>
            <Breadcrumbs label={label} />
            <AboutMain
                filmId={filmId}
                label={label}
                updateFavorite={updateFavorite}
                disabled={disabled}
            />
            <ViewSwitcher filmId={filmId} />
            <Rating
                filmId={filmId}
                ratingImdb={ratingImdb}
                rating={rating}
                updateFavorite={updateFavorite}
                disabled={disabled}
            />
            <Similars filmId={filmId} />
            <Reviews filmId={filmId} />
        </>
    );
};
