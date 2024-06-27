import { Trans } from "react-i18next";
import { routePath } from "@/app/router/router";
import { FavoriteListVariantT } from "@/entities/Favorite/model/types";
import i18n from "@/shared/i18n/config";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

const getRemoveToastMsg = (payload: {
    id: number;
    filmTitle?: string;
    listVariant: FavoriteListVariantT;
}) => {
    const { id, filmTitle = i18n.t("plural.film", { count: 1 }), listVariant } = payload;
    const link = `${routePath.details}/${id}`;

    const toasterMessage: Record<FavoriteListVariantT | "all", string> = {
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

export default getRemoveToastMsg;
