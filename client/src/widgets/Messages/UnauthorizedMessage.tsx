import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { useNavigate } from "react-router-dom";
import { StatusBox } from "shared/ui/Boxes/StatusBox";

export const UnauthorizedMessage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <StatusBox
                isError={true}
                msgOrChildren={
                    "Пользователь не обладает требуемыми правами для просмотра данной страницы."
                }
                onReload={() => navigate(routePath.main, { replace: true })}
                label="Перейти на главную"
            />
        </Page>
    );
};
