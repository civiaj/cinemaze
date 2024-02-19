import { Breadcrumbs } from "entities/Ui/ui/Breadcrumbs/Breadcrumbs";
import { useDetailsQuery } from "pages/DetailsPage/model/detailsApi";

import { DetailsPageSkeleton } from "./DetailsPageSkeleton";

import { ViewSwitcher } from "pages/DetailsPage/ui/ViewSwitcher";

import { useParams } from "react-router-dom";
import { EMPTY_LINE } from "shared/const/const";
import { Reviews } from "widgets/Reviews";
import { Similars } from "widgets/Similars";

import { useAppSelector } from "app/store";
import { useAddFavoriteMutation, useGetOneFavoriteQuery } from "entities/Favorite";
import { TFavorite } from "entities/Favorite/model/types";
import { Page, PageError } from "entities/Ui";
import { selectUser } from "entities/User";
import { useCallback } from "react";
import toast from "react-hot-toast";
import formatFilmError from "shared/api/helpers/formatFilmError";
import remapDetailsToFilm from "shared/lib/remapDetailsToFilm";
import { AboutMain, Rating } from "widgets/Details";
import { classNames } from "shared/lib/classNames";

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

    let message: string | null = null;
    if (details.error) message = formatFilmError(details.error);
    if (details.isError || !details.data) return <PageError message={message} />;

    const { nameRu, nameEn, nameOriginal, ratingImdb, rating } = details.data;
    const label = nameRu ?? nameEn ?? nameOriginal ?? EMPTY_LINE;
    const disabled = isLoading || favorite.isFetching;

    return (
        <Page className={classNames("", { ["animate-pulse"]: details.isFetching })}>
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
        </Page>
    );
};
