import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames";

const messages = {
    danger: "danger",
    regular: "regular",
    success: "success",
} as const;

type TMessage = ObjectValues<typeof messages>;

type Props = {
    message: string | ReactNode;
    className?: string;
    type?: TMessage;
};

const styles: Record<TMessage, string> = {
    regular: "text-inherit",
    danger: "text-my-red-500",
    success: "text-my-green-500",
};

export const Message = (props: Props) => {
    const { message, className, type = "regular" } = props;

    return (
        <p
            className={classNames("text-center font-medium text-sm py-4 sm:text-base", {}, [
                styles[type],
                className,
            ])}
        >
            {message}
        </p>
    );
};
