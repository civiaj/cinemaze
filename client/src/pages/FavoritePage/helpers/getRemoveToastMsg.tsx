import { routePath } from "app/router/router";
import { FavoriteListVariantT } from "pages/FavoritePage/model/types";
import { AppLink } from "shared/ui/AppLink/AppLink";

const getRemoveToastMsg = (payload: {
    filmId: number;
    filmTitle?: string;
    listVariant: FavoriteListVariantT;
}) => {
    const { filmId, filmTitle = "Фильм", listVariant } = payload;
    const link = `${routePath.details}/${filmId}`;

    const toasterTitle = (
        <AppLink to={link} className="font-bold hover:underline">
            {filmTitle}
        </AppLink>
    );

    const toasterMessage: Record<FavoriteListVariantT | "all", JSX.Element> = {
        bookmarked: <span>{toasterTitle} удален из закладок</span>,
        hidden: <span>{toasterTitle} снова отображается в общей ленте</span>,
        userScore: <span>Оценка у {toasterTitle} успешно удалена</span>,
        all: <span>{toasterTitle} удален из всех категорий</span>,
    };

    return toasterMessage[listVariant];
};

export default getRemoveToastMsg;
