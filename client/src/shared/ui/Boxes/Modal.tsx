import { AnimatedComponent, animated, easings, useSpring } from "@react-spring/web";
import { CSSProperties, FC, ReactNode, useMemo } from "react";
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
type DialogProps = { transitionValue: boolean; onCloseDialog: () => void; children: ReactNode };

type ModalType = React.FC<MainProps> & {
    Header: React.FC<HeaderProps>;
    Controls: React.FC<ControlsProps>;
    Body: React.FC<BodyProps>;
    Dialog: React.FC<DialogProps>;
};

export const Modal = withFocusTrap(
    ({ children, onClose, preventClose, className }: MainProps) => {
        return (
            <Overlay withInert hideScroll theme="modal" className="z-50">
                <Box
                    className={classNames(
                        "gap-0 p-0 sm:p-0 shadow-0 min-w-[300px] w-[clamp(500px,90%,800px)] max-h-[80vh] overflow-hidden mx-2 min-h-[300px] relative",
                        {},
                        [className]
                    )}
                >
                    <OutsideClickWrapper
                        preventClose={preventClose}
                        onClose={onClose}
                        className="overflow-hidden overflow-y-auto flex flex-1 flex-col"
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
                    ["bg-my-neutral-300"]: theme === "none",
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

Modal.Body = ({ children, className }: BodyProps) => {
    return (
        <UserBox className={classNames("flex-1 w-full justify-center", {}, [className])}>
            {children}
        </UserBox>
    );
};

Modal.Dialog = (props: DialogProps) => {
    if (!props.transitionValue) return null;
    return <TrappedModalDialogComponent {...props} />;
};

type AnimatedOverlayProps = {
    style: CSSProperties;
    onClick: () => void;
    className?: string;
};

const ModalDialogComponent = (props: DialogProps) => {
    const { onCloseDialog, children } = props;
    const [style] = useSpring(
        () => ({
            from: { transform: "translateY(50%)", opacity: 0 },
            to: { transform: "translateY(0px)", opacity: 1 },
            config: {
                duration: 200,
                easing: easings.easeOutCubic,
            },
        }),
        []
    );

    const AnimatedOverlay: AnimatedComponent<FC<AnimatedOverlayProps>> = useMemo(
        () => animated((props) => <Overlay {...props} />),
        []
    );

    return (
        <>
            <OutsideClickWrapper
                className="absolute bottom-0 left-0 w-full z-[1]"
                onClose={onCloseDialog}
            >
                <animated.div style={style} className={"w-full"}>
                    <Box className={classNames("gap-0 sm:gap-0 p-0 sm:p-0 shadow-0")} tabIndex={0}>
                        {children}
                    </Box>
                </animated.div>
            </OutsideClickWrapper>
            <AnimatedOverlay
                onClick={onCloseDialog}
                style={{ ...style, translate: "translateY(0)" }}
                className={
                    "absolute z-0 min-h-0 bg-neutral-800/50 rounded-xl dark:bg-neutral-800/50"
                }
            />
        </>
    );
};

const TrappedModalDialogComponent = withFocusTrap(ModalDialogComponent);
