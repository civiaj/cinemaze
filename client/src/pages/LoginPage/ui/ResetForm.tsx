import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useSearchParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { useResetPasswordMutation } from "@/entities/Authorization";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Input } from "@/shared/ui/Input/Input";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

export const ResetForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get("t");
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
            <StatusBox
                className="w-full"
                isSuccess={true}
                msgOrChildren={
                    <>
                        <Text>{data?.message}</Text>
                        <AppLink theme="button" to={routePath.login}>
                            {t("btn.log-in")}
                        </AppLink>
                    </>
                }
            />
        );

    return (
        <form onSubmit={onResetPasswrod}>
            <Box className="w-80 px-6">
                <Heading headinglevel={1}>{t("login.forget-t")}</Heading>

                <div className="w-full flex flex-col gap-2">
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
                </div>
                <GridMsg
                    msg={formatServerError(error)}
                    isOpen={isError}
                    className="bg-my-red-300"
                />

                <div className="flex justify-center flex-col gap-2">
                    <Button theme="blue" type="submit" isLoading={isLoading}>
                        <Text>{t("btn.recover")}</Text>
                    </Button>
                </div>
            </Box>
        </form>
    );
};
