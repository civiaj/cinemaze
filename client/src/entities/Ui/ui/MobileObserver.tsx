import { forwardRef, useCallback } from "react";
import { useAppDispatch } from "@/app/store";
import { uiActions } from "@/entities/Ui/model/slice";
import useResizeObserver, { ResizeObserverValue } from "@/shared/hooks/useResizeObserver";

type Props = {
    size?: number;
};

export const MobileObserver = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { size = 640 } = props;
    const dispatch = useAppDispatch();

    const onResize = useCallback(
        ({ width }: ResizeObserverValue) => {
            dispatch(uiActions.setIsMobile(width <= size));
        },
        [dispatch, size]
    );

    useResizeObserver(ref, onResize);

    return null;
});
