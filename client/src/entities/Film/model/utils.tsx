import { Trans } from "react-i18next";
import { routePath } from "@/app/router/router";
import { TFavorites, TFavoritesListVariants, TSearchReq } from "@/entities/Film/model/types";
import i18n from "@/shared/i18n/config";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { initialSearch } from "./data";

export const transformPayload = (payload: Partial<TSearchReq>): TSearchReq => {
    const {
        country = initialSearch.country,
        genre = initialSearch.genre,
        keyword = "",
        order = "NUM_VOTE",
        page = 1,
        ratingFrom = initialSearch.ratingFrom,
        ratingTo = initialSearch.ratingTo,
        yearFrom = initialSearch.ratingFrom,
        yearTo = initialSearch.yearTo,
    } = payload;

    return { country, genre, keyword, order, page, ratingFrom, ratingTo, yearFrom, yearTo };
};

export const getAddFavoriteToastMsg = (favorite: TFavorites, key: keyof TFavorites) => {
    let message = "";
    switch (key) {
        case "bookmarked": {
            message = favorite.bookmarked ? `toast.book-add` : `toast.book-remove`;
            break;
        }
        case "hidden": {
            message = favorite.hidden ? `toast.hidden-add` : `toast.hidden-remove`;
            break;
        }
        case "userScore": {
            message = favorite.userScore ? `toast.user-score-add` : `toast.user-score-remove`;
            break;
        }
    }

    return i18n.t(message, { score: favorite.userScore });
};

export const getRemoveToastMsg = (payload: {
    id: number;
    filmTitle?: string;
    listVariant: TFavoritesListVariants;
}) => {
    const { id, filmTitle = i18n.t("plural.film", { count: 1 }), listVariant } = payload;
    const link = `${routePath.details}/${id}`;

    const toasterMessage: Record<TFavoritesListVariants | "all", string> = {
        bookmarked: "toast.remove-book",
        hidden: "toast.remove-hidden",
        userScore: "toast.remove-rating",
        all: "toast.remove-all",
    };

    return (
        <Trans
            t={i18n.t}
            i18nKey={toasterMessage[listVariant]}
            values={{ title: filmTitle }}
            components={{
                movieLink: (
                    <AppLink to={link} className="text-blue-500">
                        {filmTitle}
                    </AppLink>
                ),
            }}
        />
    );
};
