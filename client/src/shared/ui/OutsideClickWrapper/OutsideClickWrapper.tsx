import { ReactNode } from "react";
import { useOutsideClick } from "shared/hooks/useOutsideClick";

interface OutsideClickWrapperProps {
    onClose: () => void;
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
    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
};
