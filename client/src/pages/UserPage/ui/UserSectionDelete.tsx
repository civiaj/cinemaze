import { useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { CheckPassword } from "@/pages/UserPage/ui/CheckPassword";
import { useDeleteUserMutation } from "@/entities/User/model/userApi";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Left } from "@/shared/assets/icons";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    email: string;
};

export const UserSectionDelete = ({ email }: Props) => {
    const { t } = useTranslation();
    const [isModal, setIsModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const onClose = () => {
        setIsModal(false);
        setIsChecked(false);
        reset();
    };

    const [deleteUser, { isLoading, isError, reset, error }] = useDeleteUserMutation();

    return (
        <>
            <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
                <UserBox bottom>
                    <div className="flex items-center gap-4">
                        <AppLink to={routePath.user} theme="regular-icon" className="rounded-full">
                            <Left />
                        </AppLink>
                        <Heading headinglevel={1}>{t("user.delete-t")}</Heading>
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
                <Modal theme="danger" onClose={onClose}>
                    {!isChecked ? (
                        <>
                            <CheckPassword
                                email={email}
                                onClose={onClose}
                                onSetChecked={() => setIsChecked(true)}
                            />
                        </>
                    ) : (
                        <>
                            <Modal.Body>
                                <Text as="p" className="text-center font-medium">
                                    {t("user.delete-final")}
                                </Text>
                                <GridMsg isError isOpen={isError} msg={formatServerError(error)} />
                            </Modal.Body>
                            <Modal.Controls theme="danger" className="justify-center">
                                <Button
                                    onClick={() => deleteUser()}
                                    isLoading={isLoading}
                                    theme="danger"
                                >
                                    {t("btn.delete")}
                                </Button>
                                <Button disabled={isLoading} onClick={onClose} theme="regular">
                                    {t("btn.cancel")}
                                </Button>
                            </Modal.Controls>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};
