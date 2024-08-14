import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCheckEmailMutation } from "@/entities/Authorization";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    onClose: () => void;
};

export const CheckEmail = (props: Props & { onSetChecked: () => void }) => {
    const { onSetChecked, onClose } = props;
    const { t } = useTranslation();
    const [checkEmail, { isLoading, error, isError }] = useCheckEmailMutation();
    const [email, setEmail] = useState("");

    const onEmailCheck = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        checkEmail({ email })
            .unwrap()
            .then(() => onSetChecked());
    };

    return (
        <Modal onClose={onClose}>
            <form onSubmit={onEmailCheck} id="check-email-form" className="flex flex-col flex-1">
                <Modal.Header header={t("user.email-check")} onClose={onClose} />
                <Modal.Body>
                    <Text as="p">{t("user.email-check-msg")}</Text>
                    <Input
                        fancy
                        placeholder={t("user.email")}
                        name="email"
                        autoComplete="off"
                        value={email}
                        onCleanInput={() => setEmail("")}
                        onChange={(e) => setEmail(e.target.value)}
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
