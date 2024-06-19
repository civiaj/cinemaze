import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { useUpdatePasswordMutation } from "@/entities/User/model/userApi";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    onClose: () => void;
    email: string;
};

export const NewPasswordForm = (props: Props) => {
    const { onClose } = props;
    const { t } = useTranslation();
    const [updatePassword, { isLoading, error, isError }] = useUpdatePasswordMutation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const disabled = !password || !confirmPassword;

    const onPasswordUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (disabled) return;
        updatePassword({ password, confirmPassword })
            .unwrap()
            .then(() => onClose());
    };

    return (
        <Modal onClose={onClose} preventClose>
            <form
                onSubmit={onPasswordUpdate}
                id="update-password-form"
                className="flex flex-col flex-1"
            >
                <Modal.Header header={t("user.password-change")} onClose={onClose} />
                <Modal.Body>
                    <Input
                        fancy
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onCleanInput={() => setPassword("")}
                        placeholder={t("user.password-change-next-new")}
                        focused
                    />
                    <input
                        autoComplete="username"
                        name="hidden"
                        type="text"
                        style={{ display: "none" }}
                    />
                    <Input
                        fancy
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        placeholder={t("user.password-check")}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onCleanInput={() => setConfirmPassword("")}
                    />
                    <GridMsg isError isOpen={isError} msg={formatServerError(error)} />
                </Modal.Body>
                <Modal.Controls theme={disabled ? "none" : "confirm"}>
                    <Button type="submit" isLoading={isLoading} theme="blue" disabled={disabled}>
                        <Text>{t("btn.change")}</Text>
                    </Button>
                    <Button onClick={onClose} theme="regular">
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </Modal.Controls>
            </form>
        </Modal>
    );
};
