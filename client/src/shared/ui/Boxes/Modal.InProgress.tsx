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
            <Modal.Header header="Feature Coming Soon!" onClose={onClose} />
            <Modal.Body>
                <Text>
                    Thank you for your interest in this feature. We are working hard to bring it to
                    you, but it is not yet available. Please check back later for updates.
                </Text>
            </Modal.Body>
            <Modal.Controls theme="none">
                <Button theme="regular" onClick={onClose}>
                    {t("btn.cancel")}
                </Button>
            </Modal.Controls>
        </Modal>
    );
};
