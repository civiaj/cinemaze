import { TFavorite } from "entities/Favorite";

const getAddFavoriteToastMsg = (favorite: Partial<TFavorite>) => {
    let message = "";
    switch (true) {
        case "bookmarked" in favorite: {
            message = favorite.bookmarked ? `Добавлено в "Буду смотреть` : `Убрано из закладок`;
            break;
        }
        case "hidden" in favorite: {
            message = favorite.hidden
                ? `Фильм не будет отображаться в общей ленте`
                : `Фильм снова отображается в общей ленте`;
            break;
        }
        case "userScore" in favorite: {
            message = favorite.userScore
                ? `Вы поставили оценку ${favorite.userScore}`
                : `Оценка удалена`;
            break;
        }
    }
    return message;
};

export default getAddFavoriteToastMsg;
