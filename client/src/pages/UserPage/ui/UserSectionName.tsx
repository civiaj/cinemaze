import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useUpdateDisplayNameMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Pencil } from "@/shared/assets/icons";
import { trimInput } from "@/shared/lib/trimInput";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { Text } from "@/shared/ui/Text/Text";

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
        <Modal header={t("user.name")} onClose={onClose} preventClose={isChanging}>
            <div className="flex justify-between gap-1 flex-col">
                <Text className="font-medium">{t("user.name-change-l")}</Text>
                <div className="flex items-center gap-4">
                    <div className="w-full flex flex-col gap-2">
                        {isChanging ? (
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={t("user.name-change-p")}
                            />
                        ) : (
                            <Elipsis className="sm:text-lg text-base">{name}</Elipsis>
                        )}
                        {isChanging && (
                            <GridMsg
                                className="self-start bg-my-red-300"
                                msg={message}
                                isOpen={isError}
                            />
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
                        {t("btn.save")}
                    </Button>
                    <Button theme="regular" onClick={onCancel}>
                        {t("btn.cancel")}
                    </Button>
                </div>
            )}
        </Modal>
    );
};
