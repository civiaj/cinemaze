import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { FilmDetailsActions, RatingStars } from "@/features/FilmDetailsActions";
import {
    Reviews,
    Similars,
    UpdateFavorite,
    useAddOneMutation,
    useDetailsQuery,
} from "@/entities/Film";
import { Breadcrumbs } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { TLngs } from "@/shared/i18n/types";
import { getFilmTitle } from "@/shared/lib/getFilmTitle";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Text } from "@/shared/ui/Text/Text";
import { ViewSwitcher } from "../ui/ViewSwitcher";
import { DetailsPageSkeleton } from "./DetailsPageSkeleton";

export const DetailsPageBody = () => {
    const { filmId } = useParams();
    const id = Number(filmId);
    const user = useAppSelector(selectUser);
    const { t, i18n } = useTranslation();
    const { data, isLoading, isFetching, error } = useDetailsQuery(id);

    const [addFavorite, favoriteMutation] = useAddOneMutation();

    const updateFavorite = useCallback<UpdateFavorite>(
        async (payload, key) => {
            if (!user || !data) {
                toast.error(t("favorite.unauth-msg"));
                return;
            }

            addFavorite({ ...data, favorite: { ...data.favorite, ...payload }, key });
        },
        [addFavorite, data, user, t]
    );

    if (isLoading || isFetching) return <DetailsPageSkeleton />;
    if (error) {
        return <StatusBox isError={true} msgOrChildren={formatServerError(error)} reload />;
    }
    if (!data) {
        return (
            <Box className="items-center">
                <Text>{t("search.empty-msg")}</Text>
                <AppLink to={routePath.top} theme="button">
                    {t("btn.main")}
                </AppLink>
            </Box>
        );
    }

    const { ratingImdb, rating, favorite } = data;
    const label = getFilmTitle(data, i18n.language as TLngs);
    const disabled = favoriteMutation.isLoading || isLoading || isFetching;

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
                details={{ id, ratingImdb, rating, favorite }}
                updateFavorite={updateFavorite}
                disabled={disabled}
            />
            <Similars id={id} />
            <Reviews id={id} />
        </>
    );
};
