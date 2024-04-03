import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { formatDate } from "shared/lib/formatDate";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { UserBox, UserBoxSeparator } from "shared/ui/Boxes/UserBox";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

const BanPage = () => {
    const user = useAppSelector(selectUser);
    const { i18n } = useTranslation();

    if (!user || (user && !user.isBanned)) return <Navigate to={routePath.main} replace />;

    const { banExpiration, banMessage, displayName, role } = user;

    return (
        <Page>
            <Box className="overflow-hidden">
                <Heading headinglevel={1}>Account Banned</Heading>
                <UserBoxSeparator />
                <UserBox className="border rounded-xl bg-my-red-200 text-neutral-50">
                    <Text>
                        {displayName}, на ваш аккаунт были наложены ограничения: <br />
                        1. Вы не можете добавлять, удалять или изменять фильмы в вашей коллекции.
                        <br />
                        2. Недоступен просмотр страницы со статистикой.
                        <br />
                        {(role === "admin" || role === "admin-test") && (
                            <>
                                3. Недоступен просмотр страницы со списком пользователей.
                                <br />
                            </>
                        )}
                    </Text>
                </UserBox>
                <UserBoxSeparator />
                <div className="grid grid-cols-[max-content,_1fr] gap-x-4 gap-y-1 break-words">
                    {banExpiration && (
                        <>
                            <Text>Блокировка до:</Text>
                            <Text>
                                {formatDate(new Date(banExpiration), i18n.language, "long")}
                            </Text>
                        </>
                    )}
                    {banMessage && (
                        <>
                            <Text>Причина: </Text>
                            <Text>{banMessage}</Text>
                        </>
                    )}
                </div>

                <UserBoxSeparator />
                <AppLink to={routePath.main} className="self-center" theme="button">
                    Перейти на главную
                </AppLink>
            </Box>
        </Page>
    );
};

export default BanPage;
