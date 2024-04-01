import { Modal } from "shared/ui/Boxes/Modal";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Text } from "shared/ui/Text/Text";

import { useState } from "react";
import { classNames } from "shared/lib/classNames";
import { roleOptions } from "../model/data";
import { TRoles } from "entities/User";
import { useUpdateRoleMutation } from "entities/User/model/userApi";
import formatServerError from "shared/api/helpers/formatServerError";

type Props = {
    onClose: () => void;
    role: string;
};

export const UserSectionRole = ({ onClose, role }: Props) => {
    const [newRole, setNewRole] = useState<TRoles | null>(null);
    const [updateRole, { isLoading, isError, error }] = useUpdateRoleMutation();

    const onUpdateRole = () => {
        if (!newRole) return;
        updateRole(newRole)
            .unwrap()
            .then(() => onClose());
    };

    return (
        <Modal onClose={onClose} header={"Изменение роли"}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                    <Text className="font-medium">Текущая роль:</Text>
                    <Button theme="regularTag" className="pointer-events-none" disabled>
                        <Text>{role}</Text>
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <Text className="font-medium">Выберите новую роль:</Text>
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
                <GridMsg
                    className="self-start bg-my-red-300"
                    msg={formatServerError(error)}
                    isOpen={isError}
                />
            </div>
            <div className="flex gap-2 justify-end">
                <Button
                    disabled={!newRole}
                    isLoading={isLoading}
                    onClick={onUpdateRole}
                    theme="blue"
                >
                    Сохранить
                </Button>
                <Button theme="regular" onClick={onClose}>
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};
