import { useEffect } from "react";
import { useAppDispatch } from "@/app/store";
import { uiActions } from "../model/slice";

type Props = {
    size?: number;
};

export const MobileObserver = (props: Props) => {
    const { size = 640 } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= size;
            dispatch(uiActions.setIsMobile(isMobile));
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch, size]);

    return null;
};
