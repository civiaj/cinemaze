import { routePath } from "app/router/router";
import { useAppSelector } from "app/store";
import { getAuthAndUserIsLoading } from "entities/AuthAndUser";
import { Page } from "entities/Ui";
import { selectUser } from "entities/User";
import { LoginForm } from "pages/LoginPage/ui/LoginForm";
import { RegistrateForm } from "pages/LoginPage/ui/RegistrateForm";
import { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

type TView = "login" | "registrate";

const LoginPage = () => {
    const [formType, setFormType] = useState<TView>("login");
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(getAuthAndUserIsLoading);

    const onFormTypeChange = useCallback(
        () => setFormType(formType === "login" ? "registrate" : "login"),
        [formType]
    );

    if (user) return <Navigate to={routePath.favorite} replace />;

    return (
        <Page className="h-[100dvh] items-center justify-center">
            {formType === "login" ? (
                <LoginForm onFormTypeChange={onFormTypeChange} isLoading={isLoading} />
            ) : (
                <RegistrateForm onFormTypeChange={onFormTypeChange} isLoading={isLoading} />
            )}
        </Page>
    );
};

export default LoginPage;
