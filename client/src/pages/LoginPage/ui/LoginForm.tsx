import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "entities/Authorization";
import formatServerError from "shared/api/helpers/formatServerError";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

import { LoginSections } from "../model/types";

type Props = {
    onSectionChange: (newValue?: LoginSections) => void;
    isLoading: boolean;
};

export const LoginForm = (props: Props) => {
    const { onSectionChange, isLoading } = props;
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { error, isError }] = useLoginMutation();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser({ email, password });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("t_Login")}</Heading>

                <div className="w-full flex flex-col gap-2">
                    <Input
                        type="text"
                        autoComplete="username"
                        name="email"
                        placeholder={t("e_p_address")}
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder={t("e_p_password")}
                        className="placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <FormErrorMsg msg={formatServerError(error)} isError={isError} />

                <Button onClick={() => onSectionChange("forgot")}>{t("q_Forgot")}?</Button>

                <div className="flex justify-center flex-col gap-2">
                    <Button theme="blue" type="submit" isLoading={isLoading}>
                        <Text>{t("Login")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        className="justify-center"
                        type="button"
                        onClick={() => onSectionChange("registrate")}
                    >
                        <Text>{t("Reg")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
