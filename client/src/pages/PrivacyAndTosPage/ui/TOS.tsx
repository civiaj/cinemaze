import { useTranslation } from "react-i18next";
import { PrivacyItemComponent } from "@/pages/PrivacyAndTosPage/model/types";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

export const TOS = ({ isPrivacyItem }: PrivacyItemComponent) => {
    const { t } = useTranslation();

    if (!isPrivacyItem) return null;

    return (
        <>
            <UserBoxSeparator />
            <div className="flex flex-col gap-2 py-4">
                <Heading className="text-center" headinglevel={2}>
                    {t("privacy.tos-t")}
                </Heading>
                <Heading headinglevel={3}>{t("privacy.tos-introduction-title")}</Heading>
                <Text as="p">{t("privacy.tos-introduction-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.tos-acceptable-use-title")}</Heading>
                <Text as="p">
                    {t("privacy.tos-acceptable-use-text")} <br />
                    {t("privacy.tos-prohibited-text")}
                </Text>
                <ol className="list-disc list-inside text-sm sm:text-base">
                    <li>{t("privacy.tos-prohibited-item-1")}</li>
                    <li>{t("privacy.tos-prohibited-item-2")}</li>
                    <li>{t("privacy.tos-prohibited-item-3")}</li>
                </ol>

                <Heading headinglevel={3}>{t("privacy.tos-limitation-liability-title")}</Heading>
                <Text as="p">{t("privacy.tos-limitation-liability-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.tos-intellectual-property-title")}</Heading>
                <Text as="p">{t("privacy.tos-intellectual-property-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.tos-changes-title")}</Heading>
                <Text as="p">{t("privacy.tos-changes-text")}</Text>
                <Heading headinglevel={3}>{t("privacy.tos-contact-info-title")}</Heading>
                <Text as="p">
                    {t("privacy.tos-contact-info-text")}{" "}
                    <a className="text-blue-500" href="mailto:privacy@cinemaze-app.ru">
                        {import.meta.env.VITE_SUPPORT_EMAIL}
                    </a>
                    .
                </Text>
            </div>
        </>
    );
};
