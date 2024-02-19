import { useCallback, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any*/
export const useDebounce = (callback: (...args: any) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: any) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};
