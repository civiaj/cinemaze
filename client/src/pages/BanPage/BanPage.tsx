import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { formatDate } from "shared/lib/formatDate";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

export const BanPage = () => {
    const user = useAppSelector(selectUser);
    const { i18n } = useTranslation();

    if (!user || (user && !user.isBanned)) return <Navigate to={routePath.main} replace />;

    const { banExpiration, banMessage, displayName, role } = user;

    return (
        <Page>
            <Box>
                <Heading headinglevel={1}>Account Banned</Heading>

                <UserBox className="border rounded-xl bg-my-red-200 text-neutral-50">
                    <Text>
                        {displayName}, на ваш аккаунт были наложены ограничения: <br />
                        1. Вы не можете добавлять, удалять или изменять фильмы в вашей коллекции.
                        <br />
                        2. Просмотр страницы со статистикой недоступен.
                        <br />
                        {role === "admin" && (
                            <>
                                3. Возможность просмотра страницы пользователей и внесения изменений
                                также недоступна.
                                <br />
                            </>
                        )}
                    </Text>
                </UserBox>

                {banExpiration && (
                    <Text>
                        Блокировка до: {formatDate(new Date(banExpiration), i18n.language, "long")}
                    </Text>
                )}
                {banMessage && (
                    <div className="flex flex-col gap-1">
                        <Text>Причина: </Text>
                        <UserBox className="border rounded-xl">
                            <Text className="font-medium sm:text-sm text-center">{banMessage}</Text>
                        </UserBox>
                    </div>
                )}

                <AppLink to={routePath.main} className="self-center" theme="button">
                    Перейти на главную
                </AppLink>
            </Box>
        </Page>
    );
};
