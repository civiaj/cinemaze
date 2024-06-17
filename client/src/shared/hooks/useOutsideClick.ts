import { useEffect, useRef } from "react";

export const useOutsideClick = (
    handleClose: (event: MouseEvent) => void,
    preventClose: boolean = false,
    capture: boolean = true
) => {
    //eslint-disable-next-line
    const ref = useRef<any>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (preventClose) return;
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose(event);
            }
        };

        document.addEventListener("mouseup", handleClick, { capture });

        return () => {
            document.removeEventListener("mouseup", handleClick, { capture });
        };
    }, [ref, handleClose, capture, preventClose]);

    return ref;
};
