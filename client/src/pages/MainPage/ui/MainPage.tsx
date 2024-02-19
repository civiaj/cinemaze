import { useAppSelector } from "app/store";
import { getMainQuery } from "../model/selectors";

import { MainPageBody } from "pages/MainPage/ui/MainPageBody";

const MainPage = () => {
    const mainQuery = useAppSelector(getMainQuery);
    return <MainPageBody mainQuery={mainQuery} />;
};

export default MainPage;
