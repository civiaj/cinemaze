import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useUpdateDisplayNameMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { trimInput } from "@/shared/lib/trimInput";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Elipsis } from "@/shared/ui/Text/Elipsis";

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

    const [updateName, { isLoading, isError, error, reset }] = useUpdateDisplayNameMutation();

    const onCancel = () => {
        setNewName(name);
        setIsChanging(false);
        reset();
    };

    const onSave = async () => {
        await updateName({ displayName: trimmedNewName })
            .unwrap()
            .then(() => navigate(routePath.user));
    };
    const same = name === trimmedNewName;
    let message: string | null = null;
    if (error) message = formatServerError(error);

    return (
        <Modal onClose={onClose} preventClose={isChanging}>
            <Modal.Header header={t("user.name")} onClose={onClose} />
            <Modal.Body>
                {isChanging ? (
                    <Input
                        fancy
                        onCleanInput={() => setNewName("")}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={t("user.name-change-p")}
                    />
                ) : (
                    <Elipsis className="sm:text-lg text-base">{name}</Elipsis>
                )}

                <GridMsg msg={message} isOpen={isError} isError />
            </Modal.Body>

            <Modal.Controls theme={same ? "none" : "confirm"}>
                {!isChanging ? (
                    <Button onClick={() => setIsChanging(true)} theme="regular">
                        {t("btn.change")}
                    </Button>
                ) : (
                    <>
                        <Button isLoading={isLoading} onClick={onSave} disabled={same} theme="blue">
                            {t("btn.save")}
                        </Button>
                        <Button theme="regular" onClick={onCancel}>
                            {t("btn.cancel")}
                        </Button>
                    </>
                )}
            </Modal.Controls>
        </Modal>
    );
};
