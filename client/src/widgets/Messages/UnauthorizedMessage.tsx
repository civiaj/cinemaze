import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StatusBox } from "shared/ui/Boxes/StatusBox";

export const UnauthorizedMessage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <Page>
            <StatusBox
                isError={true}
                msgOrChildren={t("unauth.default-msg")}
                onReload={() => navigate(routePath.main, { replace: true })}
                label="btn.main"
            />
        </Page>
    );
};
