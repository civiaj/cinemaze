import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { PrivacyItem } from "@/pages/PrivacyAndTosPage/model/types";
import { PrivacyPolicy } from "@/pages/PrivacyAndTosPage/ui/PrivacyPolicy";
import { TOS } from "@/pages/PrivacyAndTosPage/ui/TOS";
import { Page } from "@/entities/Ui";
import { classNames } from "@/shared/lib/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";

const key = "section";
const policyQuery = "policy";
const tosQuery = "tos";

const PrivacyPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const isPolicy = searchParams.get(key) === policyQuery;
    const isTos = searchParams.get(key) === tosQuery;
    const policyRoute = routePath.privacy + "?" + key + "=" + policyQuery;
    const tosRoute = routePath.privacy + "?" + key + "=" + tosQuery;

    const privacyItems: PrivacyItem[] = [
        { title: "privacy.tos-t", to: tosRoute, isPrivacyItem: isTos },
        { title: "privacy.policy-t", to: policyRoute, isPrivacyItem: isPolicy },
    ];

    return (
        <Page>
            <Box>
                <Heading headinglevel={1}>{t("privacy.t")}</Heading>
                <UserBoxSeparator />
                <div>
                    <ul>
                        {privacyItems.map(({ isPrivacyItem, title, to }) => (
                            <li key={title}>
                                <AppLink
                                    to={to}
                                    className={classNames("hover:underline", {
                                        ["text-blue-500 underline"]: isPrivacyItem,
                                    })}
                                >
                                    {t(title)}
                                </AppLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <TOS isPrivacyItem={isTos} />
                <PrivacyPolicy isPrivacyItem={isPolicy} />
            </Box>
        </Page>
    );
};

export default PrivacyPage;
