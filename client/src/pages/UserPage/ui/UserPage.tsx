import { useAppSelector } from "app/store";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { useTranslation } from "react-i18next";
import { Box } from "shared/ui/Boxes/Box";
import { Image } from "shared/ui/Image/Image";
import { Heading } from "shared/ui/Text/Heading";
import defaultUser from "shared/assets/images/default-user_128x128.png";

const UserPage = () => {
    const user = useAppSelector(selectUser);
    const { t } = useTranslation("userPage");

    if (!user) return "нет пользователя";

    return (
        <Page>
            <Box>
                <Heading headinglevel={1}>{t("Profile")}</Heading>
                <div>
                    <div className=" gap-x-10 gap-y-2 place-items-start">
                        <div className="grid grid-cols-[2fr,3fr] items-center border-b py-4 border-border">
                            <div className="font-medium">Фото профиля</div>
                            <Image
                                containerClassName="rounded-full w-20 h-20"
                                src={user.photo}
                                onErrorSrc={defaultUser}
                            />
                        </div>
                        <div className="grid grid-cols-[2fr,3fr] items-center border-b py-4 border-border">
                            <div className="font-medium">Адрес электронной почты</div>
                            <div>{user.email}</div>
                        </div>
                        <div className="grid grid-cols-[2fr,3fr] items-center border-b py-4 border-border">
                            <div className="font-medium">Имя пользователя</div>
                            <div>{user.displayName}</div>
                        </div>
                    </div>
                </div>
            </Box>
        </Page>
    );
};

export default UserPage;
