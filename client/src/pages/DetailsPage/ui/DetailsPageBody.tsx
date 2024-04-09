import { useAppSelector } from "app/store";
import { TFavorite, useAddFavoriteMutation, useGetOneFavoriteQuery } from "entities/Favorite";
import { Breadcrumbs } from "entities/Ui";
import { selectUser } from "entities/User";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import remapDetailsToFilm from "shared/lib/remapDetailsToFilm";
import { StatusBox } from "shared/ui/Boxes/StatusBox";
import { AboutMain, Rating } from "widgets/Details";
import { Reviews } from "widgets/Reviews";
import { Similars } from "widgets/Similars";

import { useTranslation } from "react-i18next";
import formatFilmError from "shared/api/helpers/formatFilmError";
import { TLngs } from "shared/i18n/types";
import { getFilmTitle } from "shared/lib/getFilmTitle";
import { useDetailsQuery } from "../model/detailsApi";
import { ViewSwitcher } from "../ui/ViewSwitcher";
import { DetailsPageSkeleton } from "./DetailsPageSkeleton";

export const DetailsPageBody = () => {
    const { id } = useParams();
    const filmId = Number(id);
    const user = useAppSelector(selectUser);
    const { t, i18n } = useTranslation();
    const details = useDetailsQuery(filmId);
    const favorite = useGetOneFavoriteQuery(filmId, {
        skip: !user,
    });

    const [addFavorite, { isLoading }] = useAddFavoriteMutation();

    const updateFavorite = useCallback(
        async (favorite: Partial<TFavorite>) => {
            if (!user || !details.data) {
                toast.error(t("favorite.unauth-msg"));
                return;
            }
            addFavorite({ film: remapDetailsToFilm(details.data), favorite });
        },
        [addFavorite, details, user, t]
    );

    const loading = details.isLoading || details.isFetching || favorite.isLoading;

    if (loading) return <DetailsPageSkeleton />;

    if (details.isError || !details.data)
        return (
            <StatusBox
                isError={details.isError}
                msgOrChildren={formatFilmError(details.error)}
                reload
            />
        );

    const { ratingImdb, rating } = details.data;
    const label = getFilmTitle(details.data, i18n.language as TLngs);
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
