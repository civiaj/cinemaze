import { ReactNode } from "react";
import { Close } from "@/shared/assets/icons";
import withFocusTrap from "@/shared/hoc/withFocusTrap";
import { classNames } from "@/shared/lib/classNames";
import { Box } from "@/shared/ui/Boxes/Box";
import { OutsideClickWrapper } from "@/shared/ui/Boxes/OutsideClickWrapper";
import { Overlay } from "@/shared/ui/Boxes/Overlay";
import { UserBox, UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Text/Heading";

type MainProps = {
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
type ControlsProps = Pick<MainProps, "children" | "className" | "theme">;
type BodyProps = Pick<MainProps, "children" | "className">;
type ModalType = {
    (props: MainProps): JSX.Element;
    Header(props: HeaderProps): JSX.Element;
    Controls(props: ControlsProps): JSX.Element;
    Body(props: BodyProps): JSX.Element;
};

export const Modal = withFocusTrap(
    ({ children, onClose, preventClose, className }: MainProps) => {
        return (
            <Overlay withInert hideScroll theme="modal" className="z-50">
                <Box
                    className={classNames(
                        "gap-0 p-0 sm:p-0 shadow-0 min-w-[300px] w-[clamp(500px,90%,800px)] max-h-[90%] overflow-hidden mx-2 relative min-h-[300px]",
                        {},
                        [className]
                    )}
                >
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
    },
    { customNode: document.getElementById("modal")! }
) as ModalType;

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

Modal.Controls = ({ theme, children, className }: ControlsProps) => {
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
                <div className={classNames("flex gap-2 justify-end", {}, [className])}>
                    {children}
                </div>
            </UserBox>
        </>
    );
};

Modal.Body = ({ children }: BodyProps) => {
    return <UserBox className="flex-1 h-full w-full justify-center">{children}</UserBox>;
};
