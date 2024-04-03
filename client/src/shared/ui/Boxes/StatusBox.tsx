import { ReactNode } from "react";
import { Checked, Close } from "shared/assets/icons";
import { classNames } from "shared/lib/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

type Props = {
    isSuccess?: boolean;
    isError?: boolean;
    msgOrChildren: ReactNode;
    className?: string;
    to?: string;
    reload?: boolean;
    label?: string;
    onReload?: () => void;
};

export const StatusBox = (props: Props) => {
    const {
        msgOrChildren,
        isError,
        isSuccess,
        label = "Перезагрузить",
        className,
        to,
        reload,
        onReload,
    } = props;

    if (!isSuccess && !isError) return null;

    const handleReload = () => {
        onReload ? onReload() : window.location.reload();
    };

    return (
        <Box className={classNames("items-center text-center", {}, [className])}>
            {isSuccess ? (
                <div className="rounded-full bg-my-green-500 p-2 text-neutral-50">
                    <Checked className="text-3xl" />
                </div>
            ) : (
                <div className="rounded-full bg-my-red-500 p-2 text-neutral-50">
                    <Close className="text-3xl" />
                </div>
            )}
            {typeof msgOrChildren === "string" ? <Text>{msgOrChildren}</Text> : msgOrChildren}

            {to && (
                <AppLink theme="button" to={to}>
                    {label}
                </AppLink>
            )}
            {(reload || onReload) && (
                <Button theme="regular" onClick={handleReload}>
                    {label}
                </Button>
            )}
        </Box>
    );
};
