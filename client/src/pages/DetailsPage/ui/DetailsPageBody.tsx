import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { FilmDetailsActions, RatingStars } from "@/features/FilmDetailsActions";
import { TFavorite, useAddFavoriteMutation, useGetOneFavoriteQuery } from "@/entities/Favorite";
import { Reviews, Similars, useDetailsQuery } from "@/entities/Film";
import { Breadcrumbs } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { TLngs } from "@/shared/i18n/types";
import { getFilmTitle } from "@/shared/lib/getFilmTitle";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { ViewSwitcher } from "../ui/ViewSwitcher";
import { DetailsPageSkeleton } from "./DetailsPageSkeleton";

export const DetailsPageBody = () => {
    const { filmId } = useParams();
    const id = Number(filmId);
    const user = useAppSelector(selectUser);
    const { t, i18n } = useTranslation();
    const details = useDetailsQuery(id);
    const favorite = useGetOneFavoriteQuery(id, {
        skip: !user,
    });

    const [addFavorite, { isLoading }] = useAddFavoriteMutation();

    const updateFavorite = useCallback(
        async (favorite: TFavorite) => {
            if (!user || !details.data) {
                toast.error(t("favorite.unauth-msg"));
                return;
            }
            addFavorite({ film: details.data, favorite });
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
            <FilmDetailsActions
                id={id}
                label={label}
                updateFavorite={updateFavorite}
                disabled={disabled}
            />
            <ViewSwitcher id={id} />
            <RatingStars
                details={{ id, ratingImdb, rating }}
                updateFavorite={updateFavorite}
                disabled={disabled}
            />
            <Similars id={id} />
            <Reviews id={id} />
        </>
    );
};
