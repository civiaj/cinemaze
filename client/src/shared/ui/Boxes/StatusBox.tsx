import { Checked, Close } from "shared/assets/icons";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

type Props = {
    isSuccess?: boolean;
    isError?: boolean;
    successMsg?: string;
    errorMsg?: string;
    onClick?: () => void;
    label?: string;
};

export const StatusBox = (props: Props) => {
    const { errorMsg, isError, isSuccess, successMsg, onClick, label } = props;

    const text = label ?? "Перейти на главную";
    const handleClick = onClick ? onClick : () => window.location.reload();

    if (isSuccess)
        return (
            <Box className="items-center text-center">
                <div className="rounded-full bg-my-green-500 p-2 text-neutral-50">
                    <Checked className="text-3xl" />
                </div>

                <Text>{successMsg}</Text>
                <Button theme="regular" onClick={handleClick}>
                    {text}
                </Button>
            </Box>
        );

    if (isError)
        return (
            <Box className="items-center text-center">
                <div className="rounded-full bg-my-red-500 p-2 text-neutral-50">
                    <Close className="text-3xl" />
                </div>

                <Text>{errorMsg}</Text>
                <Button theme="regular" onClick={handleClick}>
                    {text}
                </Button>
            </Box>
        );

    return null;
};
