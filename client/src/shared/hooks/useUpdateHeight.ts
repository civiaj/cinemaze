import { useEffect, useState } from "react";

export const useUpdateHeight = (extraHeigth: number = 0) => {
    const [height, setHeight] = useState(window.innerHeight - extraHeigth);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - extraHeigth);
        };
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("scroll", updateHeight);
        };
    }, [extraHeigth]);

    return height;
};
