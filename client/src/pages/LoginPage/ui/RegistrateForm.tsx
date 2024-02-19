import { useRegisterMutation } from "entities/Authorization";
import formatServerError from "shared/api/helpers/formatServerError";
import { FormErrorMsg } from "pages/LoginPage/ui/FormErrorMsg";
import { useState } from "react";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";

type Props = {
    onFormTypeChange: () => void;
    isLoading: boolean;
};

export const RegistrateForm = (props: Props) => {
    const { onFormTypeChange, isLoading } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const [registerUser, { error, isError }] = useRegisterMutation();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerUser({ confirmPassword, displayName, email, password });
    };

    let message: string | null = null;
    if (error) message = formatServerError(error);

    return (
        <form onSubmit={onSubmitHandler}>
            <Box className="w-80">
                <Heading headinglevel={1}>Регистрация</Heading>
                <div className="w-full flex flex-col gap-2">
                    <Input
                        autoComplete="username"
                        name="email"
                        placeholder="Адрес электронной почты"
                        className="placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        autoComplete="name"
                        placeholder="Имя"
                        className="placeholder:text-sm"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Пароль"
                        className="placeholder:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Подтвердите пароль"
                        className="placeholder:text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormErrorMsg msg={message} isError={isError} />
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <Button isLoading={isLoading} theme="blue" type="submit">
                        Зарегистрироваться
                    </Button>
                    <Button theme="clean" onClick={onFormTypeChange} className="justify-center">
                        Войти
                    </Button>
                </div>
            </Box>
        </form>
    );
};
