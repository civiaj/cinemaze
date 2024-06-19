import { useEffect } from "react";

export const useInert = () => {
    useEffect(() => {
        const root = document.getElementById("root");
        if (root) {
            root.inert = true;
        }

        return () => {
            if (root) {
                root.inert = false;
            }
        };
    }, []);
    return null;
};
