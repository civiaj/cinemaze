import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdatePasswordMutation } from "@/entities/User/model/userApi";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { FancyInput } from "@/shared/ui/Input/FancyInput";
import { Text } from "@/shared/ui/Text/Text";
import { CheckPassword } from "./CheckPassword";

type Props = {
    onClose: () => void;
    email: string;
};

export const UserSectionPassword = (props: Props) => {
    const { onClose } = props;
    const [isChecked, setIsChecked] = useState(false);
    const onSetChecked = () => setIsChecked(true);

    return (
        <Modal onClose={onClose} preventClose={isChecked}>
            {!isChecked ? (
                <CheckPassword onSetChecked={onSetChecked} {...props} />
            ) : (
                <NewPassword {...props} />
            )}
        </Modal>
    );
};

const NewPassword = (props: Props) => {
    const { onClose } = props;
    const inputRef = useRef<HTMLInputElement>(null);
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

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <form
            onSubmit={onPasswordUpdate}
            id="update-password-form"
            className="flex flex-col flex-1"
        >
            <Modal.Header header={t("user.password-change")} onClose={onClose} />
            <Modal.Body>
                <FancyInput
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    ref={inputRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onCleanInput={() => setPassword("")}
                    placeholder={t("user.password-change-next-new")}
                />
                <input
                    autoComplete="username"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                />
                <FancyInput
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
    );
};
