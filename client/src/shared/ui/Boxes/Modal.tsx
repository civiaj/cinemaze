import { ReactNode } from "react";
import { Close } from "@/shared/assets/icons";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Overlay } from "@/shared/ui/Boxes/Overlay";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";

type Props = {
    children: ReactNode;
    onClose: (e: MouseEvent | globalThis.KeyboardEvent) => void;
    className?: string;
    theme?: "danger" | "confirm" | "success" | "none";
    preventClose?: boolean;
};

type HeaderProps = {
    header: ReactNode;
    withCloseBtn?: boolean;
    onClose?: () => void;
};

export const Modal = ({ children, onClose, preventClose }: Props) => {
    return (
        <Overlay withInert hideScroll theme="modal" className="z-50">
            <Box className="gap-0 p-0 sm:p-0 shadow-0 min-w-[300px] w-[clamp(500px,90%,800px)] max-h-[90%] overflow-hidden mx-2 relative min-h-[300px]">
                <OutsideClickWrapper
                    preventClose={preventClose}
                    onClose={onClose}
                    className="overflow-hidden h-full overflow-y-auto flex flex-1 flex-col"
                >
                    {children}
                </OutsideClickWrapper>
            </Box>
        </Overlay>
    );
};

Modal.Header = (props: HeaderProps) => {
    const { header, withCloseBtn = true, onClose } = props;
    return (
        <>
            <UserBox>
                <header className="flex relative">
                    <Heading headinglevel={1}>{header ?? "Header"}</Heading>
                    {withCloseBtn && (
                        <div className="absolute right-0 top-0">
                            <Button
                                theme="regularIcon"
                                className="rounded-full h-8 w-8"
                                onClick={() => onClose?.()}
                            >
                                <Close className="text-base" />
                            </Button>
                        </div>
                    )}
                </header>
            </UserBox>
            <UserBoxSeparator />
        </>
    );
};

Modal.Controls = ({ theme, children }: Pick<Props, "theme" | "children">) => {
    return (
        <>
            <UserBoxSeparator
                className={classNames("w-full h-1 transition-colors", {
                    ["bg-my-green-500"]: theme === "success",
                    ["bg-blue-500"]: theme === "confirm",
                    ["bg-my-red-500"]: theme === "danger",
                    ["bg-my-neutral-200"]: theme === "none",
                })}
            />
            <UserBox className="border-0">
                <div className="flex gap-2 justify-end">{children}</div>
            </UserBox>
        </>
    );
};

Modal.Body = ({ children }: Pick<Props, "children" | "className">) => {
    return <UserBox className="flex-1 h-full w-full justify-center border-0">{children}</UserBox>;
};
