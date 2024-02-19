import { useAppSelector } from "app/store";
import { getUserVariant } from "../model/selectors";
import { FavoritePageBody } from "./FavoritePageBody";

const FavoritePage = () => {
    const listVariant = useAppSelector(getUserVariant);
    return <FavoritePageBody listVariant={listVariant} />;
};

export default FavoritePage;
