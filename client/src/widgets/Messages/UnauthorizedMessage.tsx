import { routePath } from "app/router/router";
import { Page } from "entities/Ui";
import { useNavigate } from "react-router-dom";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

export const UnauthorizedMessage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Box className="items-center">
                <Text>
                    Пользователь не обладает требуемыми правами для просмотра данной страницы.
                </Text>
                <Button onClick={() => navigate(routePath.main)} theme="regular">
                    Перейти на главную
                </Button>
            </Box>
        </Page>
    );
};
