import { useLoginMutation } from "entities/Authorization";
import { FormErrorMsg } from "pages/LoginPage/ui/FormErrorMsg";
import { useState } from "react";
import formatServerError from "shared/api/helpers/formatServerError";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    onFormTypeChange: () => void;
    isLoading: boolean;
};

export const LoginForm = (props: Props) => {
    const { onFormTypeChange, isLoading } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { error, isError }] = useLoginMutation();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser({ email, password });
    };

    let message: string | null = null;
    if (error) message = formatServerError(error);

    return (
        <form onSubmit={onSubmitHandler}>
            <Box className="w-80">
                <Heading headinglevel={1}>Логин</Heading>

                <div className="w-full flex flex-col gap-2">
                    <Input
                        type="text"
                        autoComplete="username"
                        name="email"
                        placeholder="Адрес электронной почты"
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        className="placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <FormErrorMsg msg={message} isError={isError} />

                <div className="flex justify-center flex-col gap-2">
                    <Button theme="blue" type="submit" isLoading={isLoading}>
                        Войти
                    </Button>
                    <Button
                        theme="clean"
                        className="justify-center"
                        type="button"
                        onClick={onFormTypeChange}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </Box>
        </form>
    );
};
