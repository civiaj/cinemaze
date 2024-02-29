import { routePath } from "app/router/router";
import { useUpdateDisplayNameMutation } from "entities/User";
import { t } from "i18next";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatServerError from "shared/api/helpers/formatServerError";
import { Pencil } from "shared/assets/icons";
import { trimInput } from "shared/lib/trimInput";
import { Modal } from "shared/ui/Boxes/Modal";
import { Button } from "shared/ui/Button/Button";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Input } from "shared/ui/Input/Input";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { Text } from "shared/ui/Text/Text";

type Props = {
    name: string;
    onClose: () => void;
};

export const UserSectionName = (props: Props) => {
    const { name, onClose } = props;
    const navigate = useNavigate();

    const [isChanging, setIsChanging] = useState(false);
    const [newName, setNewName] = useState(name);
    const trimmedNewName = trimInput(newName, "name");

    const [updateName, { isLoading, isError, error }] = useUpdateDisplayNameMutation();

    const onCancel = () => {
        setNewName(name);
        setIsChanging(false);
    };

    const onSave = async () => {
        await updateName({ displayName: trimmedNewName })
            .unwrap()
            .then(() => navigate(routePath.user));
    };

    let message: string | null = null;
    if (error) message = formatServerError(error);

    return (
        <Modal header={t("Name")} onClose={onClose}>
            <div className="flex justify-between gap-1 flex-col">
                <Text className="font-medium">Имя</Text>
                <div className="flex items-center gap-4">
                    <div className="w-full flex flex-col gap-2">
                        {isChanging ? (
                            <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
                        ) : (
                            <Elipsis className="sm:text-lg text-base">{name}</Elipsis>
                        )}
                        {isChanging && (
                            <FormErrorMsg className="self-start" msg={message} isError={isError} />
                        )}
                    </div>
                    {!isChanging && (
                        <Button
                            onClick={() => setIsChanging(true)}
                            theme="regularIcon"
                            className="rounded-full"
                        >
                            <Pencil />
                        </Button>
                    )}
                </div>
            </div>

            {isChanging && (
                <div className="flex gap-2 justify-end">
                    <Button
                        isLoading={isLoading}
                        onClick={onSave}
                        disabled={name === trimmedNewName}
                        theme="blue"
                    >
                        Сохранить
                    </Button>
                    <Button theme="regular" onClick={onCancel}>
                        Отмена
                    </Button>
                </div>
            )}
        </Modal>
    );
};
