import { Overlay } from "shared/ui/Boxes/Overlay";
import { Spinner } from "./Spinner";

export const FullscreenSpinner = () => {
    return (
        <Overlay>
            <Spinner className="text-neutral-300 dark:text-neutral-300 fill-blue-500" />
        </Overlay>
    );
};
