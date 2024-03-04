import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { getAuthAndUserIsLoading } from "entities/AuthAndUser";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { LoginSections } from "pages/LoginPage/model/types";
import { ForgotForm } from "pages/LoginPage/ui/ForgotForm";
import { LoginForm } from "pages/LoginPage/ui/LoginForm";
import { RegistrateForm } from "pages/LoginPage/ui/RegistrateForm";
import { ResetForm } from "pages/LoginPage/ui/ResetForm";
import { useCallback } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const LoginPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get("section");
    const isLogin = !section || section === "login";
    const isRegistrate = section === "registrate";
    const isForgot = section === "forgot";
    const isReset = section?.includes("reset");

    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(getAuthAndUserIsLoading);

    const onSectionChange = useCallback(
        (newValue?: LoginSections) => {
            !newValue ? searchParams.delete("section") : searchParams.set("section", newValue);
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams]
    );

    if (user) return <Navigate to={routePath.favorite} replace />;

    return (
        <Page className="h-[100dvh] items-center justify-center">
            {isLogin && <LoginForm onSectionChange={onSectionChange} isLoading={isLoading} />}
            {isRegistrate && (
                <RegistrateForm onSectionChange={onSectionChange} isLoading={isLoading} />
            )}
            {isForgot && <ForgotForm onSectionChange={onSectionChange} />}
            {isReset && <ResetForm />}
        </Page>
    );
};

export default LoginPage;
