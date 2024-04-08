import { useTranslation } from "react-i18next";
import { Heading } from "shared/ui/Text/Heading";
import { GoogleOAuthBtn } from "widgets/OAuth/Google";

export const OAuthOptions = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-2">
            <Heading headinglevel={4} className="font-normal">
                {t("login.with")}
            </Heading>
            <div className="flex flex-col gap-2">
                <GoogleOAuthBtn />
            </div>
        </div>
    );
};
