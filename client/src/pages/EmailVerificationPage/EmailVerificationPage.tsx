import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { StatusBox } from "shared/ui/Boxes/StatusBox";

export const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const isSuccess = searchParams.get("status") === "success";
    const isError = searchParams.get("status") === "error";

    if (!isError && !isSuccess) return <Navigate to={routePath.main} replace />;

    let msg;
    if (isError) msg = "Невозможно верифицировать адрес электронной почты.";
    if (isSuccess) msg = "Электронный адрес почты подтвержден.";

    return (
        <Page>
            <StatusBox
                isError={isError}
                isSuccess={isSuccess}
                msgOrChildren={msg}
                onReload={() => navigate(routePath.main, { replace: true })}
            />
        </Page>
    );
};
