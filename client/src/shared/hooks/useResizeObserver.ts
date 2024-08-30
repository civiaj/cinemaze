import { ForwardedRef, useEffect, useRef, useState } from "react";

export type ResizeObserverValue = { width: number; height: number };
// const useResizeObserverTest = () => {
//     const ref = useRef(null);
//     const [value, setValue] = useState<Value | null>(null);

//     const getSnapshot = () => value;
//     const subscribe = (callback: onStoreChange) => {
//         const observer = new ResizeObserver((entries) => {
//             if (entries[0]) {
//                 const { width, height } = entries[0].contentRect;
//                 setValue({ width, height });
//                 callback();
//             }
//         });
//         if (ref.current) {
//             observer.observe(ref.current);
//         }

//         return () => {
//             observer.disconnect();
//         };
//     };

//     return [ref, useSyncExternalStore(subscribe, getSnapshot)];
// };

const useResizeObserver = <T extends HTMLElement>(
    observeRef?: ForwardedRef<T>,
    onResizeCallback?: (value: ResizeObserverValue) => void
) => {
    const internalRef = useRef(null);
    const elementRef = observeRef ?? internalRef;
    const [value, setValue] = useState<ResizeObserverValue | null>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setValue({ width, height });
                onResizeCallback?.({ width, height });
            }
        });

        if (elementRef && "current" in elementRef && elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [elementRef, onResizeCallback]);

    return { elementRef, value };
};

export default useResizeObserver;
