import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Page } from "entities/Ui";

import { DetailsPageBody } from "./DetailsPageBody";

const DetailsPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Page>
            <DetailsPageBody />
        </Page>
    );
};

export default DetailsPage;
