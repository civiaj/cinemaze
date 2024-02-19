import { useEffect, useRef } from "react";

export const useOutsideClick = (handleClose: () => void, capture: boolean = true) => {
    //eslint-disable-next-line
    const ref = useRef<any>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClick, { capture });

        return () => {
            document.removeEventListener("mousedown", handleClick, { capture });
        };
    }, [ref, handleClose, capture]);

    return ref;
};
