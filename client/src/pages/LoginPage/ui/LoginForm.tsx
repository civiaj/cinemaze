import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/entities/Authorization";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { FancyInput } from "@/shared/ui/Input/FancyInput";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { LoginSections } from "../model/types";
import { OAuthOptions } from "./OAuthOptions";

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
        <form onSubmit={onSubmitHandler} id="login-form">
            <Box className="w-80 px-6 gap-4">
                <Heading headinglevel={1}>{t("login-t")}</Heading>
                <UserBoxSeparator />
                <div className="w-full flex flex-col gap-2">
                    <FancyInput
                        type="text"
                        autoComplete="username"
                        name="email"
                        placeholder={t("login.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onCleanInput={() => setEmail("")}
                    />
                    <FancyInput
                        type="password"
                        autoComplete="current-password"
                        placeholder={t("login.password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onCleanInput={() => setPassword("")}
                    />
                </div>
                <GridMsg msg={formatServerError(error)} isOpen={isError} isError />

                <div className="flex justify-center flex-col gap-2">
                    <Button theme="blue" type="submit" isLoading={isLoading}>
                        <Text>{t("btn.log-in")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        className="justify-center"
                        type="button"
                        onClick={() => onSectionChange("registrate")}
                    >
                        <Text>{t("btn.register")}</Text>
                    </Button>
                </div>
                <UserBoxSeparator />
                <OAuthOptions />
                <UserBoxSeparator />
                <Button theme="clean" onClick={() => onSectionChange("forgot")}>
                    {t("login.forget-p")}
                </Button>
            </Box>
        </form>
    );
};
