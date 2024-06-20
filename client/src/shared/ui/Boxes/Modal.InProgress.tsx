import { useTranslation } from "react-i18next";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    onClose: () => void;
};

export const ModalInProgress = ({ onClose }: Props) => {
    const { t } = useTranslation();
    return (
        <Modal onClose={onClose}>
            <Modal.Header header={t("modal.soon-t")} onClose={onClose} />
            <Modal.Body>
                <Text as="p">{t("modal.soon-m")}</Text>
            </Modal.Body>
            <Modal.Controls theme="none">
                <Button theme="regular" onClick={onClose}>
                    {t("btn.back")}
                </Button>
            </Modal.Controls>
        </Modal>
    );
};
