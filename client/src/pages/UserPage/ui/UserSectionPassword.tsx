import { useCheckPasswordMutation } from "entities/Authorization";
import { useUpdatePasswordMutation } from "entities/User/model/userApi";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import formatServerError from "shared/api/helpers/formatServerError";
import { AppImage } from "shared/ui/AppImage/AppImage";
import { Modal } from "shared/ui/Boxes/Modal";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Input } from "shared/ui/Input/Input";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { Text } from "shared/ui/Text/Text";

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
        <Modal
            onClose={onClose}
            preventClose={isChecked}
            header={isChecked ? t("user.password-change") : t("user.password-check")}
        >
            {!isChecked ? (
                <CheckPasswordSection onSetChecked={onSetChecked} {...props} />
            ) : (
                <NewPasswordSection {...props} />
            )}
        </Modal>
    );
};

const CheckPasswordSection = (props: Props & { onSetChecked: () => void }) => {
    const { photo, name, onSetChecked, onClose } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [checkPassword, { isLoading, error, isError }] = useCheckPasswordMutation();

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const onPasswordCheck = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const password = new FormData(e.currentTarget).get("password") as string;
        if (!password) return;
        checkPassword({ password })
            .unwrap()
            .then(() => onSetChecked());
    };

    return (
        <>
            <UserBox className="flex-row border rounded-xl items-center gap-4">
                <AppImage
                    containerClassName="bg-my-neutral-100 overflow-hidden w-10 h-10 rounded-xl shrink-0"
                    src={photo}
                    onErrorSrc="user"
                    className="transition-none"
                />
                <Elipsis className="font-medium">{name}</Elipsis>
            </UserBox>
            <Text as="p">{t("user.password-check-msg")}</Text>
            <form className="flex gap-4 flex-col" onSubmit={onPasswordCheck}>
                <div className="flex flex-col gap-1">
                    <label className="font-medium">
                        <Text>{t("user.password")}</Text>
                    </label>
                    <Input name="password" type="password" autoComplete="password" ref={inputRef} />
                </div>

                <GridMsg
                    isOpen={isError}
                    msg={formatServerError(error)}
                    className="bg-my-red-300"
                />

                <div className="flex self-end gap-2">
                    <Button type="submit" isLoading={isLoading} theme="blue">
                        <Text>{t("btn.confirm")}</Text>
                    </Button>
                    <Button onClick={onClose} theme="regular">
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </div>
            </form>
        </>
    );
};

const NewPasswordSection = (props: Props) => {
    const { onClose } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [updatePassword, { isLoading, error, isError }] = useUpdatePasswordMutation();

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const onPasswordUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const password = new FormData(e.currentTarget).get("password") as string;
        const confirmPassword = new FormData(e.currentTarget).get("confirmPassword") as string;
        if (!password || !confirmPassword) return;
        updatePassword({ password, confirmPassword })
            .unwrap()
            .then(() => onClose());
    };

    return (
        <>
            <form className="flex gap-4 flex-col" onSubmit={onPasswordUpdate}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label className="font-medium">
                            <Text>{t("user.password-change-next-new")}</Text>
                        </label>
                        <Input
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            ref={inputRef}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-medium">
                            <Text>{t("user.password-check")}</Text>
                        </label>
                        <input
                            autoComplete="username"
                            name="hidden"
                            type="text"
                            style={{ display: "none" }}
                        />
                        <Input name="confirmPassword" type="password" autoComplete="new-password" />
                    </div>
                </div>
                <GridMsg
                    isOpen={isError}
                    msg={formatServerError(error)}
                    className="bg-my-red-300"
                />

                <div className="flex self-end gap-2">
                    <Button type="submit" isLoading={isLoading} theme="blue">
                        <Text>{t("btn.change")}</Text>
                    </Button>
                    <Button onClick={onClose} theme="regular">
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </div>
            </form>
        </>
    );
};
