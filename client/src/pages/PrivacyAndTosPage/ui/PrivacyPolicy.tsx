import { useTranslation } from "react-i18next";
import { PrivacyItemComponent } from "@/pages/PrivacyAndTosPage/model/types";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

export const PrivacyPolicy = ({ isPrivacyItem }: PrivacyItemComponent) => {
    const { t } = useTranslation();
    if (!isPrivacyItem) return null;

    return (
        <>
            <UserBoxSeparator />
            <div className="flex flex-col gap-2 py-4">
                <Heading className="text-center" headinglevel={2}>
                    {t("privacy.policy-t")}
                </Heading>
                <Heading headinglevel={3}>{t("privacy.policy-introduction-title")}</Heading>
                <Text as="p">{t("privacy.policy-introduction-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.policy-data-collection-title")}</Heading>
                <Text as="p">{t("privacy.policy-data-collection-text")}</Text>
                <ol className="list-disc list-inside text-sm sm:text-base">
                    <li>{t("privacy.policy-data-collection-item-1")}</li>
                    <li>{t("privacy.policy-data-collection-item-2")}</li>
                </ol>

                <Heading headinglevel={3}>{t("privacy.policy-data-usage-title")}</Heading>

                <Text as="p">{t("privacy.policy-data-usage-text")} </Text>
                <ol className="list-disc list-inside text-sm sm:text-base">
                    <li>{t("privacy.policy-data-usage-item-1")}</li>
                    <li>{t("privacy.policy-data-usage-item-2")}</li>
                    <li>{t("privacy.policy-data-usage-item-3")}</li>
                </ol>

                <Heading headinglevel={3}>{t("privacy.policy-data-transfer-title")}</Heading>
                <Text as="p">{t("privacy.policy-data-transfer-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.policy-data-security-title")}</Heading>
                <Text as="p">{t("privacy.policy-data-security-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.policy-user-rights-title")}</Heading>
                <Text as="p">{t("privacy.policy-user-rights-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.policy-contact-info-title")}</Heading>
                <Text as="p">
                    {t("privacy.policy-contact-info-text")}{" "}
                    <a className="text-blue-500" href="mailto:privacy@cinemaze-app.ru">
                        {import.meta.env.VITE_SUPPORT_EMAIL}
                    </a>
                    .
                </Text>
            </div>
        </>
    );
};
