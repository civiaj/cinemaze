import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "entities/Authorization";
import formatServerError from "shared/api/helpers/formatServerError";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

import { LoginSections } from "../model/types";

type Props = {
    onSectionChange: (newValue?: LoginSections) => void;
    isLoading: boolean;
};

export const RegistrateForm = (props: Props) => {
    const { onSectionChange, isLoading } = props;
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const [registerUser, { error, isError }] = useRegisterMutation();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerUser({
            confirmPassword,
            displayName,
            email,
            password,
        });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("t_Reg")}</Heading>
                <div className="w-full flex flex-col gap-2">
                    <Input
                        autoComplete="username"
                        name="email"
                        placeholder={t("e_p_address")}
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        autoComplete="name"
                        placeholder={t("e_p_name")}
                        className="placeholder:text-sm"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("e_p_password")}
                        className="placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("e_p_conf_p")}
                        className="placeholder:text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormErrorMsg msg={formatServerError(error)} isError={isError} />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        <Text>{t("Reg")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        onClick={() => onSectionChange("login")}
                        className="justify-center"
                    >
                        <Text>{t("Login")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
