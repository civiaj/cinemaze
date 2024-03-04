import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";

import { Page } from "./Page";
import { classNames } from "shared/lib/classNames";
import { Text } from "shared/ui/Text/Text";

interface PageErrorProps {
    onReset?: () => void;
    message?: string | null;
    btnText?: string;
    className?: string;
}

export const PageError = (props: PageErrorProps) => {
    const { onReset, message, btnText, className } = props;
    const handleReset = () => (onReset ? onReset() : window.location.reload());

    return (
        <Page className={classNames("", {}, [className])}>
            <Box className="flex items-center gap-4">
                <Text>
                    {message ??
                        "Не получается отобразить содержимое. Пожалуйста, попробуйте перезагрузить страницу."}
                </Text>
                <Button theme="regular" onClick={handleReset}>
                    {btnText || "Перезагрузить"}
                </Button>
            </Box>
        </Page>
    );
};
