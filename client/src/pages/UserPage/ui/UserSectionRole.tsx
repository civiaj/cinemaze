import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TRoles } from "@/entities/User";
import { useUpdateRoleMutation } from "@/entities/User/model/userApi";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { classNames } from "@/shared/lib/classNames";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Text } from "@/shared/ui/Text/Text";
import { roleOptions } from "../model/data";

type Props = {
    onClose: () => void;
    role: string;
};

export const UserSectionRole = ({ onClose, role }: Props) => {
    const [newRole, setNewRole] = useState<TRoles | null>(null);
    const [updateRole, { isLoading, isError, error }] = useUpdateRoleMutation();
    const { t } = useTranslation();
    const onUpdateRole = () => {
        if (!newRole) return;
        updateRole(newRole)
            .unwrap()
            .then(() => onClose());
    };

    return (
        <Modal onClose={onClose}>
            <Modal.Header header={t("user.role-change")} withCloseBtn onClose={onClose} />
            <Modal.Body>
                <UserBox className="border rounded-xl px-2 py-2 sm:px-2">
                    <div className="flex gap-4 items-center">
                        <Text>{t("user.role-change-current")}:</Text>
                        <Text className="font-medium">{role}</Text>
                    </div>
                </UserBox>
                <div className="flex gap-2 items-center">
                    <Text className="font-medium">{t("user.role-change-new")}:</Text>
                    <div className="flex gap-2">
                        {roleOptions.map((roleOption) => {
                            if (roleOption.value !== role) {
                                return (
                                    <Button
                                        key={roleOption.value}
                                        theme="regularTag"
                                        onClick={() => setNewRole(roleOption.value)}
                                        className={classNames("", {
                                            ["bg-blue-500 hover:bg-blue-500 focus:bg-blue-500 text-my-neutral-50"]:
                                                newRole === roleOption.value,
                                        })}
                                        disabled={roleOption.value === "admin"}
                                    >
                                        <Text>{roleOption.label}</Text>
                                    </Button>
                                );
                            }
                        })}
                    </div>
                </div>
                <GridMsg isError msg={formatServerError(error)} isOpen={isError} />
            </Modal.Body>

            <Modal.Controls theme={!newRole ? "none" : "confirm"}>
                <Button
                    disabled={!newRole}
                    isLoading={isLoading}
                    onClick={onUpdateRole}
                    theme="blue"
                >
                    {t("btn.save")}
                </Button>
                <Button theme="regular" onClick={onClose}>
                    {t("btn.cancel")}
                </Button>
            </Modal.Controls>
        </Modal>
    );
};
