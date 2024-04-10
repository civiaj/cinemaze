import { useState } from "react";
import { useTranslation } from "react-i18next";
import { OAuthOptions } from "@/pages/LoginPage/ui/OAuthOptions";
import { useRegisterMutation } from "@/entities/Authorization";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Box } from "@/shared/ui/Boxes/Box";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
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
            <Box className="w-80 px-6 overflow-hidden">
                <Heading headinglevel={1}>{t("login.register")}</Heading>
                <UserBoxSeparator />
                <div className="w-full flex flex-col gap-2">
                    <Input
                        autoComplete="username"
                        name="email"
                        placeholder={t("login.email")}
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        autoComplete="name"
                        placeholder={t("login.name")}
                        className="placeholder:text-sm"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("login.password")}
                        className="placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("login.confirm")}
                        className="placeholder:text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <GridMsg
                        msg={formatServerError(error)}
                        isOpen={isError}
                        className="bg-my-red-300"
                    />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        <Text>{t("btn.register")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        onClick={() => onSectionChange("login")}
                        className="justify-center"
                    >
                        <Text>{t("btn.log-in")}</Text>
                    </Button>
                </div>
                <UserBoxSeparator />
                <OAuthOptions />
            </Box>
        </form>
    );
};
