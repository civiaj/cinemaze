import { useCallback, useRef } from "react";

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
    const isTrottle = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: any[]) => {
            if (isTrottle.current) return;

            callback(...args);

            isTrottle.current = setTimeout(() => {
                isTrottle.current = null;
            }, delay);
        },
        [delay, callback]
    );
};
