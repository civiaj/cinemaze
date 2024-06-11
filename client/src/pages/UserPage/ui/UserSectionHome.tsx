import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { TUser } from "@/entities/User";
import { Checked, Close, Right } from "@/shared/assets/icons";
import { formatDate } from "@/shared/lib/formatDate";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { SECTIONS_USER } from "../model/types";

type Props = {
    user: TUser;
};

export const UserSectionHome = ({ user }: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <Box className="sm:p-0 p-0 gap-0 sm:gap-0 overflow-hidden">
            <UserBox className="gap-0">
                <Heading headinglevel={1}>{t("user-t")}</Heading>
                <div className="hidden grid-cols-[1fr_max-content] place-items-end gap-x-2 sm:grid">
                    <Text className="text-xs sm:text-xs">{t("user.created")}:</Text>
                    <Text className="text-xs sm:text-xs place-self-start">
                        {formatDate(new Date(user.createdAt), i18n.language, "long")}
                    </Text>
                    <Text className="text-xs sm:text-xs">{t("user.updated")}:</Text>
                    <Text className="text-xs sm:text-xs place-self-start">
                        {formatDate(new Date(user.updatedAt), i18n.language, "long")}
                    </Text>
                </div>
            </UserBox>
            <UserBox>
                <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                    <Text className="font-medium">{t("user.email")}</Text>
                    <div className="flex flex-col gap-1 overflow-hidden">
                        <Elipsis>{user.email}</Elipsis>
                        {user.verified ? (
                            <div className="flex gap-2 items-center">
                                <div className="rounded-full text-my-green-500 flex items-center justify-center border-2 border-my-green-500 text-sm sm:text-base">
                                    <Checked />
                                </div>
                                <Elipsis className="text-my-green-500">{t("user.email-y")}</Elipsis>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="rounded-full text-my-neutral-500 flex items-center justify-center border-2 border-my-red-500 text-sm sm:text-my-red-500">
                                    <Close />
                                </div>
                                <Elipsis className="text-my-red-500">{t("user.email-n")}</Elipsis>
                            </div>
                        )}
                    </div>
                </div>
            </UserBox>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.PHOTO}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <Text className="font-medium">{t("user.photo")}</Text>
                        <div className="flex justify-between items-center overflow-hidden">
                            <AppImage
                                containerClassName="rounded-xl w-12 h-12 sm:w-20 sm:h-20 "
                                src={user.photo}
                                onErrorSrc="user"
                                className="transition-none"
                            />
                            <Right className="text-xl shrink-0" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>

            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.NAME}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <Text className="font-medium">{t("user.name")}</Text>
                        <div className="flex justify-between items-center overflow-hidden">
                            <Elipsis>{user.displayName}</Elipsis>
                            <Right className="text-xl shrink-0" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.DEVICES}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <Text className="font-medium">{t("user.devices")}</Text>
                        <div className="flex justify-between items-center overflow-hidden">
                            <Elipsis>{t("user.devices-all")}</Elipsis>
                            <Right className="text-xl shrink-0" />
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
                            <Text className="font-medium">{t("user.password")}</Text>
                            <div className="flex justify-between items-center overflow-hidden">
                                <div>{t("user.password-change")}</div>
                                <Right className="text-xl shrink-0" />
                            </div>
                        </div>
                    </UserBox>
                </AppLink>
            )}
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.ROLE}`} theme="user-menu">
                <UserBox className="border-b-0">
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <Text className="font-medium">{t("user.role")}</Text>
                        <div className="flex justify-between items-center overflow-hidden">
                            <Elipsis>{user.role}</Elipsis>
                            <Right className="text-xl shrink-0" />
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
