import { routePath } from "app/router/router";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "entities/Authorization";
import formatServerError from "shared/api/helpers/formatServerError";
import { Checked } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import { Input } from "shared/ui/Input/Input";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

export const ResetForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get("t");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [resetPassword, { data, isLoading, isError, error }] = useResetPasswordMutation();

    const onResetPasswrod = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!resetToken) return;
        resetPassword({ password, confirmPassword, resetToken });
    };

    if (!resetToken) return <Navigate to={routePath.login} replace />;

    if (data)
        return (
            <Box className="items-center">
                <div className="rounded-full bg-my-green-500 p-2">
                    <Checked className="text-3xl" />
                </div>
                <Text>{data?.message}</Text>
                <Button
                    theme="regular"
                    onClick={() => navigate(routePath.login, { replace: true })}
                >
                    {t("Login")}
                </Button>
            </Box>
        );

    return (
        <form onSubmit={onResetPasswrod}>
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("t_Recovery")}</Heading>

                <div className="w-full flex flex-col gap-2">
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
                </div>
                <GridMsg
                    msg={formatServerError(error)}
                    isOpen={isError}
                    className="bg-my-red-300"
                />

                <div className="flex justify-center flex-col gap-2">
                    <Button theme="blue" type="submit" isLoading={isLoading}>
                        <Text>{t("Recovery")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
