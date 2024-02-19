import { useLocation } from "react-router-dom";
import { DetailsPageBody } from "./DetailsPageBody";
import { useEffect } from "react";

const DetailsPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <DetailsPageBody />;
};

export default DetailsPage;
