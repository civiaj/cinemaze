import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { TUser } from "@/entities/User";
import { SECTIONS_USER } from "@/pages/UserPage/model/types";
import { Checked, Close, Right } from "@/shared/assets/icons";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    user: TUser;
};

const formatDate = (locale: string, value: string) => {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

export const UserSectionHome = ({ user }: Props) => {
    const { i18n } = useTranslation();

    return (
        <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
            <UserBox className="gap-0">
                <Heading headinglevel={1}>{t("user-t")}</Heading>
                <div className="grid grid-cols-[1fr_max-content] place-items-end gap-x-2">
                    <Text className="text-xs sm:text-xs">{t("user.created")}:</Text>
                    <Text className="text-xs sm:text-xs place-self-start">
                        {formatDate(i18n.language, user.createdAt)}
                    </Text>
                    <Text className="text-xs sm:text-xs">{t("user.updated")}:</Text>
                    <Text className="text-xs sm:text-xs place-self-start">
                        {formatDate(i18n.language, user.updatedAt)}
                    </Text>
                </div>
            </UserBox>
            <UserBox>
                <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                    <div className="font-medium min-w-0">{t("user.email")}</div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <div>{user.email}</div>
                        {user.verified ? (
                            <div className="flex gap-2 items-center">
                                <div className="rounded-full text-my-green-500 flex items-center justify-center border-2 border-my-green-500 text-base">
                                    <Checked />
                                </div>
                                <Elipsis className="text-my-green-500 sm:text-sm">
                                    {t("user.email-y")}
                                </Elipsis>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="rounded-full text-my-neutral-500 flex items-center justify-center border-2 border-my-neutral-500 text-base">
                                    <Close />
                                </div>
                                <span className="text-my-neutral-500 sm:text-sm">
                                    {t("user.email-n")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </UserBox>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.PHOTO}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">{t("user.photo")}</div>
                        <div className="flex justify-between items-center">
                            <AppImage
                                containerClassName="rounded-full w-20 h-20 "
                                src={user.photo}
                                onErrorSrc="user"
                                className="transition-none"
                            />
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>

            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.NAME}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">{t("user.name")}</div>
                        <div className="flex justify-between items-center">
                            <div>{user.displayName}</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.DEVICES}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">{t("user.devices")}</div>
                        <div className="flex justify-between items-center">
                            <div>{t("user.devices-all")}</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            {["local", "test"].includes(user.provider) && (
                <AppLink
                    to={`${routePath.user}?section=${SECTIONS_USER.PASSWORD}`}
                    theme="user-menu"
                >
                    <UserBox>
                        <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                            <div className="font-medium">{t("user.password")}</div>
                            <div className="flex justify-between items-center">
                                <div>{t("user.password-change")}</div>
                                <Right className="text-xl" />
                            </div>
                        </div>
                    </UserBox>
                </AppLink>
            )}
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.ROLE}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">{t("user.role")}</div>
                        <div className="flex justify-between items-center">
                            <div>{user.role}</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            {user.isBanned && (
                <AppLink
                    to={routePath.ban}
                    className="text-sm rounded-b-xl hover:bg-my-red-300 bg-my-red-200 font-medium text-center text-neutral-50"
                >
                    <UserBox className="py-1 rounded-b-xl">{t("ban.msg-small")}</UserBox>
                </AppLink>
            )}
        </Box>
    );
};
