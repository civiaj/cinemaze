import { useTranslation } from "react-i18next";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { UserPhotoDeleteModal } from "./UserPhotoDeleteModal";

type Props = {
    photo: string;
    onSetSection: (value: "current" | "change" | "remove") => void;
    onClose: () => void;
    isDefault: boolean;
    isRemove: boolean;
};

export const UserCurrentPhoto = (props: Props) => {
    const { photo, onClose, onSetSection, isDefault, isRemove } = props;
    const { t } = useTranslation();

    return (
        <Modal onClose={onClose} preventClose={isRemove}>
            <Modal.Header onClose={onClose} header={t("user.photo")} />
            <Modal.Body>
                <AppImage
                    src={photo}
                    onErrorSrc="user"
                    containerClassName="w-72 h-72 self-center rounded-xl"
                />
            </Modal.Body>

            <Modal.Controls theme="none">
                <Button onClick={() => onSetSection("change")} theme="regular">
                    <Text>{t("btn.change")}</Text>
                </Button>
                {!isDefault && (
                    <Button theme="danger" onClick={() => onSetSection("remove")}>
                        <Text>{t("btn.delete")}</Text>
                    </Button>
                )}
            </Modal.Controls>
            {isRemove && (
                <UserPhotoDeleteModal onClose={() => onSetSection("current")} isModal={isRemove} />
            )}
        </Modal>
    );
};
