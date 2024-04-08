import { routePath } from "app/router/router";
import { useDeletePhotoMutation } from "entities/User";
import { UserModalAnimationHoc } from "pages/UserPage/ui/UserSectionPhoto/UserModalAnimationHoc";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import formatServerError from "shared/api/helpers/formatServerError";
import { classNames } from "shared/lib/classNames";
import { Box } from "shared/ui/Boxes/Box";
import { UserBox, UserBoxSeparator } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

type Props = {
    onClose: () => void;
    isModal: boolean;
};

const Modal = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [deletePhoto, { isLoading, isError, error }] = useDeletePhotoMutation();
    const navigate = useNavigate();

    const onDelete = () => {
        deletePhoto()
            .unwrap()
            .then(() => navigate(routePath.user));
    };

    return (
        <Box className={classNames("gap-0 sm:gap-0 p-0 sm:p-0 shadow-0")}>
            <UserBox>
                <Heading headinglevel={1}>{t("user.photo-delete")}</Heading>
            </UserBox>
            <UserBox className="gap-2 sm:gap-4">
                <Text>{t("user.photo-delete-msg")}</Text>
                <GridMsg
                    isOpen={isError}
                    msg={formatServerError(error)}
                    className="bg-my-red-300"
                />
                <UserBoxSeparator />
                <div className="border-0 flex self-center gap-2">
                    <Button
                        className="font-medium"
                        theme="danger"
                        onClick={onDelete}
                        isLoading={isLoading}
                    >
                        <Text>{t("btn.delete")}</Text>
                    </Button>
                    <Button onClick={onClose} theme="regular" className="font-medium">
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </div>
            </UserBox>
            <div className="w-full h-2 shrink-0 bg-red-500" />
        </Box>
    );
};

export const UserPhotoDeleteModal = (props: Props) => {
    const Component = UserModalAnimationHoc(Modal, {
        transitionValue: props.isModal,
        onCloseModal: props.onClose,
    });

    return <Component {...props} />;
};
