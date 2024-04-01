import { routePath } from "app/router/router";
import { ReactNode } from "react";
import { Checked, Close } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

type Props = {
    isSuccess?: boolean;
    isError?: boolean;
    successMsg?: ReactNode;
    errorMsg?: ReactNode;
    onClick?: () => void;
    label?: string;
};

export const StatusBox = (props: Props) => {
    const {
        errorMsg = "Возникла ошибка",
        isError,
        isSuccess,
        successMsg = "Запрос выполнен успешно",
        onClick,
        label = "Перейти на главную",
    } = props;

    const handleClick = onClick ? onClick : () => window.location.replace(routePath.main);

    if (isSuccess)
        return (
            <Box className="items-center text-center">
                <div className="rounded-full bg-my-green-500 p-2 text-neutral-50">
                    <Checked className="text-3xl" />
                </div>

                {typeof successMsg === "string" ? <Text>{successMsg}</Text> : successMsg}
                <Button theme="regular" onClick={handleClick}>
                    {label}
                </Button>
            </Box>
        );

    if (isError)
        return (
            <Box className="items-center text-center">
                <div className="rounded-full bg-my-red-500 p-2 text-neutral-50">
                    <Close className="text-3xl" />
                </div>

                {typeof errorMsg === "string" ? <Text>{errorMsg}</Text> : errorMsg}
                <Button theme="regular" onClick={handleClick}>
                    {label}
                </Button>
            </Box>
        );

    return null;
};
