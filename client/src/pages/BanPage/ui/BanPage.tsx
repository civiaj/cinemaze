import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useAppSelector } from "@/app/store";
import { Page } from "@/entities/Ui";
import { selectUser } from "@/entities/User";
import { formatDate } from "@/shared/lib/formatDate";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

const BanPage = () => {
    const user = useAppSelector(selectUser);
    const { t, i18n } = useTranslation();

    if (!user || (user && !user.isBanned)) return <Navigate to={routePath.top} replace />;

    const { banExpiration, banMessage, displayName, role } = user;

    return (
        <Page>
            <Box className="overflow-hidden">
                <Heading headinglevel={1}>{t("ban-t")}</Heading>
                <UserBoxSeparator />
                <UserBox rounded className="bg-my-red-200 text-neutral-50">
                    <Text>
                        {displayName}, {t("ban.msg")}: <br />
                        {t("ban.one")}
                        <br />
                        {t("ban.two")}
                        <br />
                        {(role === "admin" || role === "admin-test") && (
                            <>
                                {t("ban.three")}
                                <br />
                            </>
                        )}
                    </Text>
                </UserBox>
                <UserBox rounded>
                    <div className="grid grid-cols-[max-content,_1fr] gap-x-4 gap-y-1 break-words">
                        {banExpiration && (
                            <>
                                <Text>{t("manage.banExpiration")}:</Text>
                                <Text>
                                    {formatDate(new Date(banExpiration), i18n.language, "long")}
                                </Text>
                            </>
                        )}
                        {banMessage && (
                            <>
                                <Text>{t("manage.banMessage")}: </Text>
                                <Text>{banMessage}</Text>
                            </>
                        )}
                    </div>
                </UserBox>

                <AppLink to={routePath.top} className="self-center" theme="button">
                    {t("btn.main")}
                </AppLink>
            </Box>
        </Page>
    );
};

export default BanPage;
