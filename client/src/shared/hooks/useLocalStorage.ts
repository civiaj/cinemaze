import { useState, useEffect } from "react";

export const useLocalStorage = <T>(initialValue: T, key: string) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return { value, setValue };
};
