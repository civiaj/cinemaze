import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Page } from "@/features/Page";
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
