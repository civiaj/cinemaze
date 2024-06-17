import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCheckPasswordMutation } from "@/entities/Authorization";
import { useUpdatePasswordMutation } from "@/entities/User/model/userApi";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { FancyInput } from "@/shared/ui/Input/FancyInput";
import { Text } from "@/shared/ui/Text/Text";

type Props = {
    onClose: () => void;
    name: string;
    photo: string;
    email: string;
};

export const UserSectionPassword = (props: Props) => {
    const { onClose } = props;
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const onSetChecked = () => setIsChecked(true);

    return (
        <Modal onClose={onClose} preventClose={isChecked}>
            <Modal.Header
                header={isChecked ? t("user.password-change") : t("user.password-check")}
                onClose={onClose}
            />
            {!isChecked ? (
                <CheckPassword onSetChecked={onSetChecked} {...props} />
            ) : (
                <NewPassword {...props} />
            )}
        </Modal>
    );
};

const CheckPassword = (props: Props & { onSetChecked: () => void }) => {
    const { onSetChecked, onClose } = props;
    const { t } = useTranslation();
    const [checkPassword, { isLoading, error, isError }] = useCheckPasswordMutation();
    const [password, setPassword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onPasswordCheck = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return;
        checkPassword({ password })
            .unwrap()
            .then(() => onSetChecked());
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <form onSubmit={onPasswordCheck} id="check-password-form">
            <Modal.Body>
                <Text as="p">{t("user.password-check-msg")}</Text>
                <FancyInput
                    placeholder={t("user.password")}
                    name="password"
                    type="password"
                    autoComplete="password"
                    value={password}
                    onCleanInput={() => setPassword("")}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={inputRef}
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
        <form onSubmit={onPasswordUpdate} id="update-password-form">
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
