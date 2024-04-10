import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { GoogleOAuthBtn } from "@/widgets/OAuth/Google";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Heading } from "@/shared/ui/Text/Heading";

export const OAuthOptions = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="flex flex-col gap-2">
            <Heading headinglevel={4} className="font-normal">
                {t("login.with")}
            </Heading>
            <div className="flex flex-col gap-2">
                <GoogleOAuthBtn />
            </div>
            <GridMsg isOpen={Boolean(error)} msg={error} className="bg-my-red-200" />
        </div>
    );
};
