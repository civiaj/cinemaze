import { useEffect, useRef, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [delay, value]);

    return debouncedValue;
};
