import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useDeletePhotoMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Box } from "@/shared/ui/Boxes/Box";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Text } from "@/shared/ui/Text/Text";
import { UserModalAnimationHoc } from "../UserSectionPhoto/UserModalAnimationHoc";

type Props = {
    onClose: () => void;
    isModal: boolean;
};

const DeleteModal = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [deletePhoto, { isLoading, isError, error }] = useDeletePhotoMutation();
    const navigate = useNavigate();

    const onDelete = () => {
        deletePhoto()
            .unwrap()
            .then(() => navigate(routePath.user));
    };

    return (
        <Box className="p-0 sm:p-0">
            <Modal.Header header={t("user.photo-delete")} onClose={onClose} />
            <Modal.Body>
                <Text>{t("user.photo-delete-msg")}</Text>
                <GridMsg isError isOpen={isError} msg={formatServerError(error)} />
            </Modal.Body>

            <Modal.Controls theme="danger">
                <Button theme="danger" onClick={onDelete} isLoading={isLoading}>
                    <Text>{t("btn.delete")}</Text>
                </Button>
                <Button onClick={onClose} theme="regular">
                    <Text>{t("btn.cancel")}</Text>
                </Button>
            </Modal.Controls>
        </Box>
    );
};

export const UserPhotoDeleteModal = (props: Props) => {
    const Component = UserModalAnimationHoc(DeleteModal, {
        transitionValue: props.isModal,
        onCloseModal: props.onClose,
    });

    return <Component {...props} />;
};
