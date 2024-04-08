import { TFavorite } from "entities/Favorite";
import i18n from "shared/i18n/config";

const getAddFavoriteToastMsg = (favorite: Partial<TFavorite>) => {
    let message = "";
    switch (true) {
        case "bookmarked" in favorite: {
            message = favorite.bookmarked ? `toast.book-add` : `toast.book-remove`;
            break;
        }
        case "hidden" in favorite: {
            message = favorite.hidden ? `toast.hidden-add` : `toast.hidden-remove`;
            break;
        }
        case "userScore" in favorite: {
            message = favorite.userScore ? `toast.user-score-add` : `toast.user-score-remove`;
            break;
        }
    }

    return i18n.t(message, { score: favorite.userScore });
};

export default getAddFavoriteToastMsg;
