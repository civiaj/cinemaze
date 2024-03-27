import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForgotPasswordMutation } from "entities/Authorization";
import { Box } from "shared/ui/Boxes/Box";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";
import formatServerError from "shared/api/helpers/formatServerError";
import { Checked } from "shared/assets/icons";
import { trimInput } from "shared/lib/trimInput";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

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
            <Box className="items-center text-center">
                <div className="rounded-full bg-my-green-500 p-2">
                    <Checked className="text-3xl" />
                </div>
                <Text>{data?.message}</Text>
                <Text className="font-medium">{email}</Text>
            </Box>
        );

    return (
        <form onSubmit={onRequestPasswordReset}>
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("t_Recovery")}</Heading>
                <div className="w-full flex flex-col gap-2">
                    <Input
                        autoComplete="username"
                        name="email"
                        placeholder={t("e_p_address")}
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <GridMsg
                        msg={formatServerError(error)}
                        isOpen={isError}
                        className="bg-my-red-300"
                    />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        <Text>{t("p_reset")}</Text>
                    </Button>
                    <Button
                        theme="clean"
                        onClick={() => onSectionChange("login")}
                        className="justify-center"
                    >
                        <Text>{t("Cancel")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
