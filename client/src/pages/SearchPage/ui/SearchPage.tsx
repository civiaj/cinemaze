import { AppRoutes } from "@/app/router/router";
import { RouteBasedFilmManager } from "@/entities/Film";
import { SearchPageBody } from "./SearchPageBody";

const SearchPage = () => {
    return (
        <RouteBasedFilmManager currentRoute={AppRoutes.SEARCH}>
            <SearchPageBody />
        </RouteBasedFilmManager>
    );
};

export default SearchPage;
