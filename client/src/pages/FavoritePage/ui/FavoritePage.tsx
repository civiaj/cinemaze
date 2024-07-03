import { AppRoutes } from "@/app/router/router";
import { RouteBasedFilmManager } from "@/entities/Film";
import { FavoritePageBody } from "./FavoritePageBody";

const FavoritePage = () => {
    return (
        <RouteBasedFilmManager currentRoute={AppRoutes.FAVORITE}>
            <FavoritePageBody />
        </RouteBasedFilmManager>
    );
};

export default FavoritePage;
