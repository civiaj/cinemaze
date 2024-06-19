import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCheckPasswordMutation } from "@/entities/Authorization";
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

export const CheckPassword = (props: Props & { onSetChecked: () => void }) => {
    const { onSetChecked, onClose } = props;
    const { t } = useTranslation();
    const [checkPassword, { isLoading, error, isError }] = useCheckPasswordMutation();
    const [password, setPassword] = useState("");

    const onPasswordCheck = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return;
        checkPassword({ password })
            .unwrap()
            .then(() => onSetChecked());
    };

    return (
        <Modal onClose={onClose}>
            <form
                onSubmit={onPasswordCheck}
                id="check-password-form"
                className="flex flex-col flex-1"
            >
                <Modal.Header header={t("user.password-check")} onClose={onClose} />
                <Modal.Body>
                    <Text as="p">{t("user.password-check-msg")}</Text>
                    <Input
                        fancy
                        placeholder={t("user.password")}
                        name="password"
                        type="password"
                        autoComplete="password"
                        value={password}
                        onCleanInput={() => setPassword("")}
                        onChange={(e) => setPassword(e.target.value)}
                        focused
                    />
                    <GridMsg isError isOpen={isError} msg={formatServerError(error)} />
                </Modal.Body>
                <Modal.Controls theme="none">
                    <Button type="submit" isLoading={isLoading} theme="blue">
                        <Text>{t("btn.confirm")}</Text>
                    </Button>
                    <Button onClick={onClose} theme="regular">
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </Modal.Controls>
            </form>
        </Modal>
    );
};
