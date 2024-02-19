import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { useNavigate } from "react-router-dom";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Message } from "shared/ui/Text/Message";

export const UnauthorizedMessage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Box className="items-center">
                <Message message="Пользователь не обладает требуемыми правами для просмотра данной страницы." />
                <Button onClick={() => navigate(routePath.main)} theme="regular">
                    Перейти на главную
                </Button>
            </Box>
        </Page>
    );
};
