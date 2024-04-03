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
                ? `Фильм не будет отображаться в общей ленте и учитываться в статистике`
                : `Фильм снова отображается в общей ленте и учитывается в статистике`;
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
