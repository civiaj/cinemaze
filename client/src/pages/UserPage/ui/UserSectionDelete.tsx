import { useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { Left } from "@/shared/assets/icons";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

export const UserSectionDelete = () => {
    const { t } = useTranslation();
    const [isModal, setIsModal] = useState(false);
    return (
        <>
            <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
                <UserBox bottom>
                    <div className="flex items-center gap-4">
                        <AppLink to={routePath.user} theme="regular-icon" className="rounded-full">
                            <Left />
                        </AppLink>
                        <Heading headinglevel={1} className="font-medium">
                            {t("user.delete-t")}
                        </Heading>
                    </div>
                </UserBox>

                <UserBox bottom>
                    <Heading headinglevel={3}>{t("user.delete-welcome")}</Heading>
                    <Text as="p">{t("user-delete-ifno")}</Text>
                    <Text as="p">{t("user.delete-continue")}</Text>
                </UserBox>
                <UserBox>
                    <Button onClick={() => setIsModal(true)} theme="danger" className="self-end">
                        {t("user.delete-a")}
                    </Button>
                </UserBox>
            </Box>
            {isModal && (
                <Modal theme="danger" onClose={() => setIsModal(false)}>
                    <Modal.Body>
                        <Heading className="text-center" headinglevel={2}>
                            {t("user.delete-final")}
                        </Heading>
                    </Modal.Body>
                    <Modal.Controls theme="danger">
                        <Button theme="danger">{t("btn.delete")}</Button>
                        <Button theme="regular">{t("btn.cancel")}</Button>
                    </Modal.Controls>
                </Modal>
            )}
        </>
    );
};
