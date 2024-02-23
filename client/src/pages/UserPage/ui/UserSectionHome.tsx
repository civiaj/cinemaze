import { t } from "i18next";
import { Checked, Close, Right } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Image } from "shared/ui/Image/Image";
import { Heading } from "shared/ui/Text/Heading";
import defaultUser from "shared/assets/images/default-user_128x128.png";
import { TUser } from "entities/User";
import { TUserSection } from "pages/UserPage/model/types";

type Props = {
    user: TUser;
    onChangeSection: (newSection: TUserSection) => void;
};

export const UserSectionHome = (props: Props) => {
    const { user, onChangeSection } = props;

    return (
        <Box className="sm:p-0 p-0">
            <Heading headinglevel={1} className="sm:pt-6 sm:px-6 pt-4 px-2">
                {t("Profile")}
            </Heading>
            <div>
                <div className="py-10">
                    <div className="grid grid-cols-[2fr,3fr] items-center border-b py-4 border-border sm:px-6 pt-4 px-2 gap-x-4">
                        <div className="font-medium">Адрес электронной почты</div>
                        <div className="flex flex-col gap-1">
                            <div>{user.email}</div>
                            {user.verified ? (
                                <div className="text-sm flex gap-2 items-center">
                                    <div className="h-4 w-4 rounded-full bg-my-green-500 flex items-center justify-center">
                                        <Checked className="text-my-neutral-50" />
                                    </div>
                                    <span className="text-my-green-500">
                                        Адрес электронной почты подтвержден
                                    </span>
                                </div>
                            ) : (
                                <div className="text-sm flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-my-red-500 flex items-center justify-center">
                                        <Close className="text-my-neutral-50" />
                                    </div>
                                    <span className="text-my-red-500">
                                        Адрес электронной почты не подтвержден
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={() => onChangeSection("photo")}
                        theme="userprofile"
                        className="sm:px-6 pt-4 px-2 border-b border-border"
                    >
                        <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                            <div className="font-medium">Фото профиля</div>
                            <div className="flex justify-between items-center">
                                <Image
                                    containerClassName="rounded-full w-20 h-20"
                                    src={user.photo}
                                    onErrorSrc={defaultUser}
                                />
                                <Right className="text-xl" />
                            </div>
                        </div>
                    </Button>

                    <Button
                        theme="userprofile"
                        className="sm:px-6 pt-4 px-2 border-b border-border"
                        onClick={() => onChangeSection("name")}
                    >
                        <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                            <div className="font-medium">Имя пользователя</div>
                            <div className="flex justify-between items-center">
                                <div>{user.displayName}</div>
                                <Right className="text-xl" />
                            </div>
                        </div>
                    </Button>
                    <Button
                        onClick={() => onChangeSection("devices")}
                        theme="userprofile"
                        className="sm:px-6 pt-4 px-2 border-b border-border"
                    >
                        <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                            <div className="font-medium">Устройства</div>
                            <div className="flex justify-between items-center">
                                <div>Windows 10</div>
                                <Right className="text-xl" />
                            </div>
                        </div>
                    </Button>
                    <Button
                        onClick={() => onChangeSection("password")}
                        theme="userprofile"
                        className="sm:px-6 pt-4 px-2 border-b border-border"
                    >
                        <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                            <div className="font-medium">Пароль</div>
                            <div className="flex justify-between items-center">
                                <div>••••••••</div>
                                <Right className="text-xl" />
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        </Box>
    );
};
