import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { useForgotPasswordMutation } from "@/entities/Authorization";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { trimInput } from "@/shared/lib/trimInput";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { FancyInput } from "@/shared/ui/Input/FancyInput";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";
import { LoginSections } from "../model/types";

type Props = {
    onSectionChange: (newValue?: LoginSections) => void;
};

export const ForgotForm = ({ onSectionChange }: Props) => {
    const [email, setEmail] = useState("");
    const trimmedEmail = trimInput(email, "name");
    const { t } = useTranslation();

    const [requestPasswordReset, { data, isLoading, isError, error }] = useForgotPasswordMutation();

    const onRequestPasswordReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!trimmedEmail) return;
        requestPasswordReset({ email });
    };

    if (data)
        return (
            <StatusBox
                className="w-full"
                isSuccess={true}
                msgOrChildren={
                    <>
                        <Text>{data.message}</Text>
                        <Text className="font-medium">{email}</Text>
                        <AppLink theme="button" to={routePath.login}>
                            {t("login-t")}
                        </AppLink>
                    </>
                }
            />
        );

    return (
        <form onSubmit={onRequestPasswordReset} id="forget-form">
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("login.forget-t")}</Heading>
                <div className="w-full flex flex-col gap-2">
                    <FancyInput
                        autoComplete="username"
                        name="email"
                        placeholder={t("login.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onCleanInput={() => setEmail("")}
                    />
                    <GridMsg msg={formatServerError(error)} isOpen={isError} isError />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        <Text>{t("btn.recover")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        onClick={() => onSectionChange("login")}
                        className="justify-center"
                    >
                        <Text>{t("btn.cancel")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
