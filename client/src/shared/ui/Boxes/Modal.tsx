import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import { Box } from "shared/ui/Boxes/Box";
import { Overlay } from "shared/ui/Boxes/Overlay";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { OutsideClickWrapper } from "shared/ui/OutsideClickWrapper/OutsideClickWrapper";
import { Heading } from "shared/ui/Text/Heading";

export const Modal = ({
    children,
    onClose,
    theme = "none",
    header,
}: {
    children: ReactNode;
    onClose: () => void;
    className?: string;
    theme?: "danger" | "confirm" | "success" | "none";
    header: ReactNode;
}) => {
    const HeaderComponent = () => {
        if (typeof header === "string") {
            return (
                <UserBox className="min-h-[73px] items-center flex-row">
                    <Heading headinglevel={1}>{header ?? "Header"}</Heading>
                </UserBox>
            );
        } else return header;
    };

    return (
        <Overlay withInert hideScroll theme="modal" className="z-50">
            <Box className="gap-0 p-0 sm:p-0 shadow-0 min-w-[300px] w-[clamp(500px,90%,800px)] max-h-[90%] overflow-hidden mx-2 relative">
                <OutsideClickWrapper
                    onClose={onClose}
                    className="overflow-hidden h-full overflow-y-auto"
                >
                    <div className="flex flex-col gap-0 h-full">
                        {<HeaderComponent />}
                        <UserBox className="gap-4 flex-1">{children}</UserBox>
                        <div
                            className={classNames("w-full h-2 shrink-0", {
                                ["bg-my-green-500"]: theme === "success",
                                ["bg-blue-500"]: theme === "confirm",
                                ["bg-my-red-500"]: theme === "danger",
                                ["bg-my-neutral-300"]: theme === "none",
                            })}
                        />
                    </div>
                </OutsideClickWrapper>
            </Box>
        </Overlay>
    );
};
