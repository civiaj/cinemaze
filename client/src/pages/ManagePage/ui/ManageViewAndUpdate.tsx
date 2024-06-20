import { useState } from "react";
import { useTranslation } from "react-i18next";
import { roleOptions } from "@/pages/UserPage";
import { TUser } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Block, Checked, Close, Minus } from "@/shared/assets/icons";
import { formatDate } from "@/shared/lib/formatDate";
import { AppSelect } from "@/shared/ui/AppSelect/AppSelect";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Text/Text";
import { useUnbanOneMutation, useUpdateOneMutation } from "../model/manageApi";
import { ChangeUserData, ManageActionViews } from "../model/types";

type Props = {
    user: TUser;
    manageView: ManageActionViews;
    onSetManageView: (newView: ManageActionViews) => void;
    onSetActive: (newId: string | null) => void;
};

export const ManageViewAndUpdate = ({ user, manageView, onSetManageView, onSetActive }: Props) => {
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
        provider,
    } = user;
    const [isUnban, setIsUnban] = useState(false);
    const defaultChange: ChangeUserData = { displayName, role, deletePhoto: false };
    const [changeData, setChangeData] = useState(defaultChange);
    const { t, i18n } = useTranslation();
    const isDefaultPhoto = photo === "default-user.jpeg";

    const areSame = JSON.stringify(changeData) === JSON.stringify(defaultChange);
    const [updateOne, { isLoading, isError, error, reset }] = useUpdateOneMutation();
    const [unbanOne, unban] = useUnbanOneMutation();

    const onOpenUnban = () => {
        setIsUnban(true);
    };

    const onCloseUnban = () => {
        setIsUnban(false);
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

    const handleCancelUnban = () => {
        setIsUnban(false);
    };

    return (
        <>
            <UserBox>
                <div className="grid gap-x-8 grid-cols-[max-content,_1fr] gap-y-2 items-center">
                    <Text className="font-medium">{t("manage.displayName")}:</Text>
                    {manageView === "info" && <Text className="truncate">{displayName}</Text>}
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
                            onCleanInput={() =>
                                setChangeData((p) => ({
                                    ...p,
                                    displayName: "",
                                }))
                            }
                        />
                    )}

                    <Text className="font-medium">{t("manage.email")}:</Text>
                    <Text className="truncate">{email}</Text>

                    <Text className="font-medium">{t("manage.verified")}:</Text>
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

                    <Text className="font-medium">{t("manage.role")}:</Text>
                    {manageView === "info" && <Text>{role}</Text>}
                    {manageView === "update" && (
                        <AppSelect
                            className="w-full font-normal text-sm"
                            value={changeData.role}
                            actionChange={(newData) =>
                                setChangeData((p) => ({ ...p, role: newData }))
                            }
                            options={roleOptions}
                        />
                    )}

                    <Text className="font-medium">{t("manage.provider")}:</Text>
                    <Text className="truncate">{provider}</Text>

                    <Text className="font-medium">{t("manage.updatedAt")}:</Text>
                    <Text>{formatDate(new Date(updatedAt), i18n.language, "long")}</Text>

                    <Text className="font-medium">{t("manage.createdAt")}:</Text>
                    <Text>{formatDate(new Date(createdAt), i18n.language, "long")}</Text>

                    <Text className="font-medium">{t("manage.isBanned")}:</Text>
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
                            <Text className="font-medium">{t("manage.banExpiration")}:</Text>
                            <Text>
                                {formatDate(new Date(banExpiration), i18n.language, "long")}
                            </Text>
                            {banMessage && (
                                <>
                                    <Text className="font-medium">{t("manage.banMessage")}:</Text>
                                    <Text>{banMessage}</Text>
                                </>
                            )}
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
                                <Text>{t("manage.delete-photo")}</Text>
                                <Checked className="text-my-neutral-50 absolute left-0 top-1/2 -translate-y-1/2 hidden peer-checked:block" />
                            </label>
                        </>
                    )}
                </div>
                {manageView === "update" && isError && (
                    <div className="w-full">
                        <GridMsg isOpen={isError} msg={formatServerError(error)} isError />
                    </div>
                )}
            </UserBox>
            <UserBoxSeparator />
            <UserBox>
                <div className="flex gap-4 self-end">
                    {manageView === "update" && (
                        <>
                            <Button
                                onClick={() => onUpdateUser(changeData)}
                                className="font-medium"
                                theme="blue"
                                disabled={areSame}
                                isLoading={isLoading}
                            >
                                {t("btn.save")}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                disabled={isLoading}
                                theme="regular"
                                className="font-medium"
                            >
                                {t("btn.cancel")}
                            </Button>
                        </>
                    )}
                    {manageView === "info" && (
                        <>
                            <Button
                                className="font-medium"
                                onClick={() => onSetManageView("update")}
                                theme="regular"
                            >
                                {t("btn.change")}
                            </Button>
                            <Button
                                theme="danger"
                                className="font-medium"
                                onClick={() => onSetManageView("ban")}
                            >
                                {t("btn.block")}
                            </Button>
                            {isBanned && (
                                <Button
                                    theme="success"
                                    className="font-medium"
                                    onClick={onOpenUnban}
                                >
                                    {t("btn.unblock")}
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </UserBox>
            {isUnban && (
                <Modal theme="success" onClose={onCloseUnban}>
                    <Modal.Header header={t(`manage.t`)} onClose={onCloseUnban} />
                    <Modal.Body>
                        <Text>
                            {t("manage.unban-message")} <strong>{displayName}</strong>?
                        </Text>
                        {banExpiration && (
                            <UserBox rounded>
                                <div>
                                    {Boolean(banMessage) && (
                                        <Text className="font-medium">
                                            {t("manage.banMessage")}:{" "}
                                        </Text>
                                    )}
                                    <Text>{banMessage}</Text>
                                </div>
                                <div>
                                    <Text className="font-medium">
                                        {t("manage.banExpiration")}:{" "}
                                    </Text>
                                    <Text>
                                        {formatDate(new Date(banExpiration), i18n.language, "long")}
                                    </Text>
                                </div>
                            </UserBox>
                        )}
                        {unban.isError && (
                            <GridMsg
                                isOpen={unban.isError}
                                msg={formatServerError(unban.error)}
                                isError
                            />
                        )}
                    </Modal.Body>
                    <Modal.Controls theme="success">
                        <Button
                            className="font-medium"
                            theme="success"
                            onClick={onUnbanUser}
                            isLoading={unban.isLoading}
                        >
                            <Text>{t("btn.unblock")}</Text>
                        </Button>
                        <Button onClick={handleCancelUnban} theme="regular" className="font-medium">
                            <Text>{t("btn.cancel")}</Text>
                        </Button>
                    </Modal.Controls>
                </Modal>
            )}
        </>
    );
};
