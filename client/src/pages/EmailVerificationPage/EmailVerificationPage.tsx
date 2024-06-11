import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { routePath } from "@/app/router/router";
import { Page } from "@/entities/Ui";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";

export const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { t } = useTranslation();

    const isSuccess = searchParams.get("status") === "success";
    const isError = searchParams.get("status") === "error";

    if (!isError && !isSuccess) return <Navigate to={routePath.main} replace />;

    let msg;
    if (isError) msg = t("verify.error-msg");
    if (isSuccess) msg = t("verify.success-msg");

    return (
        <Page>
            <StatusBox
                label="btn.main"
                isError={isError}
                isSuccess={isSuccess}
                msgOrChildren={msg}
                onReload={() => navigate(routePath.main, { replace: true })}
            />
        </Page>
    );
};
