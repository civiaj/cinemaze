import { ReactNode, useEffect } from "react";
import { useOutsideClick } from "shared/hooks/useOutsideClick";

interface OutsideClickWrapperProps {
    onClose: (e: MouseEvent | globalThis.KeyboardEvent) => void;
    children: ReactNode;
    capture?: boolean;
    className?: string;
}

export const OutsideClickWrapper = ({
    onClose,
    children,
    capture,
    className,
}: OutsideClickWrapperProps) => {
    const ref = useOutsideClick(onClose, capture);

    useEffect(() => {
        const onKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose(e);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onClose]);

    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
};
