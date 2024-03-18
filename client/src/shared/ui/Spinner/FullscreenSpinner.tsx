import { Overlay } from "shared/ui/Boxes/Overlay";
import { Spinner } from "./Spinner";
import { classNames } from "shared/lib/classNames";

type Props = {
    hideScroll?: boolean;
    withInert?: boolean;
    theme?: "modal";
    className?: string;
};

export const FullscreenSpinner = (props: Props) => {
    const { className, ...other } = props;
    return (
        <Overlay withInert hideScroll {...other} className={classNames("z-50", {}, [className])}>
            <Spinner />
        </Overlay>
    );
};
