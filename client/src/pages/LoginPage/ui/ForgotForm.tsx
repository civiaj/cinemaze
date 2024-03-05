import { Box } from "shared/ui/Boxes/Box";
import { FormErrorMsg } from "shared/ui/FormErrorMsg/FormErrorMsg";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";

import { useForgotPasswordMutation } from "entities/Authorization";
import { FormEvent, useState } from "react";
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
                <Heading headinglevel={1}>Восстановление</Heading>
                <div className="w-full flex flex-col gap-2">
                    <Input
                        autoComplete="username"
                        name="email"
                        placeholder="Адрес электронной почты"
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormErrorMsg msg={formatServerError(error)} isError={isError} />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        <Text>Восстановить пароль</Text>
                    </Button>
                    <Button
                        theme="clean"
                        onClick={() => onSectionChange("login")}
                        className="justify-center"
                    >
                        <Text>Отмена</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
