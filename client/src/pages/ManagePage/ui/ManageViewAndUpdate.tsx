import { TUser } from "entities/User";
import { useUnbanOneMutation, useUpdateOneMutation } from "pages/ManagePage/model/manageApi";
import { ChangeUserData, ManageActionViews } from "pages/ManagePage/model/types";
import { roleOptions } from "pages/UserPage/model/data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import formatServerError from "shared/api/helpers/formatServerError";
import { Block, Checked, Close, Minus } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { formatDate } from "shared/lib/formatDate";
import { trimInput } from "shared/lib/trimInput";
import { AppSelect } from "shared/ui/AppSelect/AppSelect";
import { Modal } from "shared/ui/Boxes/Modal";
import { UserBox, UserBoxSeparator } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Input } from "shared/ui/Input/Input";
import { Text } from "shared/ui/Text/Text";

type Props = {
    user: TUser;
    manageView: ManageActionViews;
    onSetManageView: (newView: ManageActionViews) => void;
    onSetActive: (newId: string | null) => void;
    onPreventCloseActive: (newValue: boolean) => void;
};

export const ManageViewAndUpdate = ({
    user,
    manageView,
    onSetManageView,
    onSetActive,
    onPreventCloseActive,
}: Props) => {
    const {
        displayName,
        role,
        photo,
        updatedAt,
        createdAt,
        email,
        verified,
        isBanned,
        banExpiration,
        banMessage,
        id,
    } = user;
    const [isUnban, setIsUnban] = useState(false);
    const defaultChange: ChangeUserData = { displayName, role, deletePhoto: false };
    const [changeData, setChangeData] = useState(defaultChange);
    const { i18n } = useTranslation();
    const isDefaultPhoto = photo === "default-user.jpeg";
    const areSame =
        trimInput(changeData.displayName, "name") === displayName && changeData.role === role;

    const [updateOne, { isLoading, isError, error, reset }] = useUpdateOneMutation();
    const [unbanOne, unban] = useUnbanOneMutation();

    const onOpenUnban = () => {
        onPreventCloseActive(true);
        setIsUnban(true);
    };

    const onCloseUnban = () => {
        onPreventCloseActive(false);
        setIsUnban(false);
        unban.reset();
    };

    const onUpdateUser = (data: ChangeUserData) => {
        updateOne({ ...data, manageUserId: user.id })
            .unwrap()
            .then(() => onSetActive(null));
    };

    const onUnbanUser = () => {
        unbanOne({ id, displayName })
            .unwrap()
            .then(() => onSetActive(null));
    };

    const handleCancel = () => {
        onSetManageView("info");
        setChangeData(defaultChange);
        reset();
    };

    return (
        <>
            <div className="grid gap-x-4 grid-cols-[max-content,_1fr] gap-y-1">
                <p>DisplayName:</p>
                {manageView === "info" && <p className="truncate">{displayName}</p>}
                {manageView === "update" && (
                    <Input
                        className="h-5 text-sm"
                        value={changeData.displayName}
                        onChange={(e) =>
                            setChangeData((p) => ({
                                ...p,
                                displayName: e.target.value,
                            }))
                        }
                    />
                )}

                <p>Email:</p>
                <p className="truncate">{email}</p>

                <p>Verified:</p>
                <div className="place-self-start">
                    {verified ? (
                        <div className="rounded-full p-[1px] text-my-green-500 border-2 border-my-green-500">
                            <Checked />
                        </div>
                    ) : (
                        <div className="rounded-full p-[1px] text-my-neutral-500 border-2 border-my-neutral-500">
                            <Close />
                        </div>
                    )}
                </div>

                <p>Role:</p>
                {manageView === "info" && <p>{role}</p>}
                {manageView === "update" && (
                    <AppSelect
                        className="h-5 w-full font-normal text-sm"
                        value={changeData.role}
                        actionChange={(newData) => setChangeData((p) => ({ ...p, role: newData }))}
                        options={roleOptions}
                        itemHeight={20}
                    />
                )}

                <p>UpdatedAt:</p>
                <p>{formatDate(new Date(updatedAt), i18n.language, "long")}</p>

                <p>CreatedAt:</p>
                <p>{formatDate(new Date(createdAt), i18n.language, "long")}</p>

                <p>Banned:</p>
                <div className="place-self-start">
                    {isBanned ? (
                        <div className="rounded-full p-[1px] text-my-red-500 border-2 border-my-red-500">
                            <Block />
                        </div>
                    ) : (
                        <div className="rounded-full p-[1px] text-my-neutral-500 border-2 border-my-neutral-500">
                            <Minus />
                        </div>
                    )}
                </div>
                {isBanned && banExpiration && (
                    <>
                        <p>Ban until:</p>
                        <p>{formatDate(new Date(banExpiration), i18n.language, "long")}</p>
                        <p>Ban message:</p>
                        <p>{banMessage || "Сообщение не было указано"}</p>
                    </>
                )}

                {manageView === "update" && !isDefaultPhoto && (
                    <>
                        <div />
                        <label className="flex items-center gap-2 cursor-pointer self-start hover:underline relative select-none place-self-start">
                            <input
                                className="appearance-none checked:bg-blue-500 cursor-pointer w-4 h-4 text-blue-500 bg-my-neutral-300 rounded focus:ring-blue-500 peer outline-none focus:ring-2 "
                                type="checkbox"
                                checked={changeData.deletePhoto}
                                onChange={(e) =>
                                    setChangeData((p) => ({
                                        ...p,
                                        deletePhoto: e.target.checked,
                                    }))
                                }
                            />
                            <p>Удалить фото профиля</p>
                            <Checked className="text-my-neutral-50 absolute left-0 top-1/2 -translate-y-1/2 hidden peer-checked:block" />
                        </label>
                    </>
                )}
            </div>
            {manageView === "update" && isError && (
                <div className="w-full">
                    <GridMsg
                        className="bg-my-red-200"
                        isOpen={isError}
                        msg={formatServerError(error)}
                    />
                </div>
            )}
            <UserBoxSeparator />
            <div className="flex gap-4 self-end">
                {manageView === "update" && (
                    <>
                        <Button
                            onClick={() => onUpdateUser(changeData)}
                            className={classNames("py-1 h-auto text-sm font-medium", {
                                ["hidden pointer-events-none"]: areSame,
                            })}
                            theme="blue"
                            isLoading={isLoading}
                        >
                            Сохранить
                        </Button>
                        <Button
                            onClick={handleCancel}
                            disabled={isLoading}
                            theme="regular"
                            className="py-1 h-auto text-sm font-medium"
                        >
                            Отмена
                        </Button>
                    </>
                )}
                {manageView === "info" && (
                    <>
                        {isBanned && (
                            <Button
                                theme="success"
                                className="py-1 h-auto text-sm font-medium"
                                onClick={onOpenUnban}
                            >
                                Разблокировать
                            </Button>
                        )}
                        <Button
                            className="py-1 h-auto text-sm font-medium"
                            onClick={() => onSetManageView("update")}
                            theme="regular"
                        >
                            Изменить
                        </Button>
                        <Button
                            theme="danger"
                            className="py-1 h-auto text-sm font-medium"
                            onClick={() => onSetManageView("ban")}
                        >
                            Заблокировать
                        </Button>
                    </>
                )}
            </div>
            {isUnban && (
                <Modal
                    theme="success"
                    header={`Разблокировать пользователя`}
                    onClose={onCloseUnban}
                >
                    <Text>Вы действильно хотите разблокировать пользователя {displayName}?</Text>
                    {banExpiration && (
                        <UserBox className="border rounded-xl">
                            <Text className="sm:text-sm">
                                Ban until:{" "}
                                {formatDate(new Date(banExpiration), i18n.language, "long")}
                            </Text>
                            <Text className="sm:text-sm">
                                Ban message: {banMessage || "Сообщение не было указано"}
                            </Text>
                        </UserBox>
                    )}
                    {unban.isError && (
                        <GridMsg
                            className="bg-my-red-200"
                            isOpen={unban.isError}
                            msg={formatServerError(unban.error)}
                        />
                    )}
                    <div className="self-end flex items-center justify-center gap-2">
                        <Button
                            className="font-medium"
                            theme="success"
                            onClick={onUnbanUser}
                            isLoading={unban.isLoading}
                        >
                            <Text>Разблокировать</Text>
                        </Button>
                        <Button
                            onClick={() => setIsUnban(false)}
                            theme="regular"
                            className="font-medium"
                        >
                            <Text>Отмена</Text>
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};
