import { AppRoutes } from "@/app/router/router";
import { RouteBasedFilmManager } from "@/entities/Film";
import { MainPageBody } from "./MainPageBody";

const MainPage = () => {
    return (
        <RouteBasedFilmManager currentRoute={AppRoutes.TOP}>
            <MainPageBody />
        </RouteBasedFilmManager>
    );
};

export default MainPage;
