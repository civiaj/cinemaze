import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import { CheckEmail } from "@/pages/UserPage/ui/CheckEmail";
import { selectUser } from "@/entities/User";
import { useDeleteUserMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Text } from "@/shared/ui/Text/Text";
import { CheckPassword } from "./CheckPassword";

type Props = {
    onCloseModal: () => void;
};

export const UserSectionDeleteModal = ({ onCloseModal }: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const { t } = useTranslation();
    const { provider } = useAppSelector(selectUser)! ?? {};

    const onClose = () => {
        onCloseModal();
        setIsChecked(false);
        reset();
    };

    const [deleteUser, { isLoading, isError, reset, error }] = useDeleteUserMutation();

    const handleDelete = async () => {
        await deleteUser();
        window.location.reload();
    };

    if (!isChecked) {
        if (provider === "google") {
            return <CheckEmail onClose={onClose} onSetChecked={() => setIsChecked(true)} />;
        }

        return <CheckPassword onClose={onClose} onSetChecked={() => setIsChecked(true)} />;
    }

    return (
        <Modal theme="danger" onClose={onClose}>
            <Modal.Body>
                <Text as="p" className="text-center font-medium">
                    {t("user.delete-final")}
                </Text>
                <GridMsg isError isOpen={isError} msg={formatServerError(error)} />
            </Modal.Body>
            <Modal.Controls theme="danger" className="justify-center">
                <Button onClick={handleDelete} isLoading={isLoading} theme="danger">
                    {t("btn.delete")}
                </Button>
                <Button disabled={isLoading} onClick={onClose} theme="regular">
                    {t("btn.cancel")}
                </Button>
            </Modal.Controls>
        </Modal>
    );
};
